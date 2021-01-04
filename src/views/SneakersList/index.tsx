import { useState } from 'react';
import {
    useQuery
} from 'react-query'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getSneakers } from '../../api';

import Form from '../../components/Form';
import Modal from '../../common/Modal';

import { Sneaker } from '../../components/Form/index.d'

const SneakersList = (): JSX.Element => {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const { isLoading, error, data } = useQuery('getSneakers', async () =>
        await (await getSneakers()).json()
    )

    if (isLoading) return <> <div>'Loading...'</div></>

    if (error) return <><div>'An error has occurred: ' + error.message</div></>

    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-center flex-wrap flex-row">
                    {
                        data.map((sneaker: Sneaker) => (
                            <div key={sneaker._id} className="w-min p-8 m-4 bg-blue-400 rounded-md shadow-md">
                                <div className="flex flex-row">
                                    <p>{sneaker.brand}</p>
                                    <p>{sneaker.model}</p>
                                    <p>{sneaker.label}</p>
                                </div>
                                <p>{sneaker.purchase_date}</p>
                                <p>{sneaker.retail_price}</p>
                                <p>{sneaker.ressel_price}</p>
                                <p>{sneaker.sale_date}</p>
                                <p>{sneaker.shop}</p>
                                <p>{sneaker.size}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="fixed cursor-pointer right-4 bottom-4 w-12 h-12 rounded-full bg-gray-400 flex justify-center items-center"
                    onClick={() => setIsOpenForm((isOpenForm) => !isOpenForm)}
                >
                    <FontAwesomeIcon className="fill-current text-white" icon={faPlus} />
                </div>
                {
                    isOpenForm && (
                        <Modal onClose={() => setIsOpenForm((isOpenForm) => !isOpenForm)}>
                            <Form onClose={() => setIsOpenForm(false)} />
                        </Modal>
                    )
                }
            </div>
        </>
    )
}

export default SneakersList;