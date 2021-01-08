import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEuroSign, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

import { getSneakers, deleteSneaker } from '../../api';

import Form from '../../components/Form';
import Modal from '../../components/common/Modal';
import CautionModal from '../../components/common/CautionModal';

import './style.css';

import { Sneaker } from '../../components/Form/index.d'

const SneakersList = (): JSX.Element => {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const [isOpenCautionModal, setIsOpenCautionModal] = useState(false)
    const [sneakerIdToDelete, setSneakerIdToDelete] = useState('')
    const [isClosingModal, setIsClosingModal] = useState(false)
    const [sneakerData, setSneakerData] = useState<Sneaker>()
    const queryClient = useQueryClient()

    const { isLoading, error, data } = useQuery('getSneakers', async () =>
        await (await getSneakers()).json()
    )

    const { mutate } = useMutation(async (sneakerId: string) => await deleteSneaker(sneakerId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('getSneakers')
                setIsOpenCautionModal(false);
            }
        })

    const onDeleteSneaker = (sneakerId: string) => {
        setSneakerIdToDelete(sneakerId)
        setIsOpenCautionModal(true);
    }

    const onValidateDelete = () => {
        setIsClosingModal(true)
        setTimeout(() => {
            setIsClosingModal(false)
            mutate(sneakerIdToDelete)
            setSneakerIdToDelete('')
        }, 400);
    }

    const closeModal = () => {
        setIsClosingModal(true)
        setTimeout(() => {
            setIsClosingModal(false)
            setIsOpenForm((isOpenForm) => !isOpenForm)
            setSneakerData(undefined)
        }, 400);
    }

    if (isLoading) return <> <div>'Loading...'</div></>

    if (error) return <><div>'An error has occurred: ' + error.message</div></>

    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-center flex-wrap flex-row">
                    {
                        data.map((sneaker: Sneaker) => (
                            <div key={sneaker._id} className="bg-white shadow-xl rounded-lg py-3 m-4">
                                <div className="p-2">
                                    <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                                        {sneaker.label}
                                    </h3>
                                    <div className="text-center text-gray-400 text-xs font-semibold">
                                        <p>{sneaker.brand} {sneaker.model}</p>
                                    </div>
                                    <table className="text-xs my-3">
                                        <tbody>
                                            <tr>
                                                <td className="px-2 py-2 text-gray-500 font-semibold">Taille</td>
                                                <td className="px-2 py-2">{sneaker.size} US</td>
                                            </tr>
                                            <tr>
                                                <td className="px-2 py-2 text-gray-500 font-semibold">Acheté le</td>
                                                <td className="px-2 py-2">{sneaker.purchase_date}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-2 py-2 text-gray-500 font-semibold">Retail</td>
                                                <td className="px-2 py-2">{sneaker.retail_price} <FontAwesomeIcon icon={faEuroSign} /></td>
                                            </tr>
                                            <tr>
                                                <td className="px-2 py-2 text-gray-500 font-semibold">Shop</td>
                                                <td className="px-2 py-2">{sneaker.shop}</td>
                                            </tr>
                                        </tbody></table>

                                    <div className="flex justify-between items-center space-x-2">
                                        <button onClick={() => onDeleteSneaker(sneaker._id)} className="h-8 rounded-lg w-full bg-red-400"><FontAwesomeIcon className="fill-current text-white" icon={faTrash} /></button>
                                        <button onClick={() => {
                                            setIsOpenForm((isOpenForm) => !isOpenForm)
                                            setSneakerData(sneaker)
                                        }} className="h-8 rounded-lg w-full border-2 border-solid"><FontAwesomeIcon className="fill-current text-black" icon={faPencilAlt} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="fixed cursor-pointer right-4 bottom-4 w-12 h-12 rounded-full bg-green-300 flex justify-center items-center z-10"
                    onClick={() => setIsOpenForm((isOpenForm) => !isOpenForm)}>
                    <FontAwesomeIcon className="fill-current text-white" icon={faPlus} />
                </div>
                {isOpenForm && (
                    <Modal isClosing={isClosingModal} onClose={closeModal}>
                        <Form onClose={closeModal} defaultValues={sneakerData} />
                    </Modal>
                )}
                {isOpenCautionModal && (
                    <CautionModal
                        isClosing={isClosingModal}
                        onClose={() => {
                            setIsClosingModal(true)
                            setTimeout(() => {
                                setIsClosingModal(false)
                                setIsOpenCautionModal((isOpenCautionModal) => !isOpenCautionModal)
                            }, 400);
                        }}
                        onValidate={onValidateDelete}
                    />
                )}
            </div>
        </>
    )
}

export default SneakersList;