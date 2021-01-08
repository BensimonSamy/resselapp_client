import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';

import { useMutation, useQueryClient } from 'react-query';

import { Sneaker, Props } from './index.d'

import { addSneaker, updateSneaker } from '../../api';

const Form = ({ onClose, defaultValues }: Props) => {
    const { register, errors, handleSubmit, watch, setValue } = useForm<Sneaker>({ defaultValues });
    const queryClient = useQueryClient()

    const { already_buy } = watch()

    const { mutate } = useMutation(async (data: Sneaker) => defaultValues ? await updateSneaker(defaultValues._id, data) : await addSneaker(data),
        {
            onSuccess: () => queryClient.invalidateQueries('getSneakers')
        })

    const requiredField = () => <p className="text-red-500 text-xs">Champ obligatoire</p>

    const onSubmit = (data: Sneaker) => {
        mutate(data)
        onClose()
    }

    useEffect(() => {
        if (defaultValues?.sale_date || defaultValues?.ressel_price) setValue("already_buy", true)
    }, [defaultValues?.ressel_price, defaultValues?.sale_date, setValue])


    return (
        <div className="relative w-full md:max-w-sm md:mx-auto">
            <h1 className="block w-full text-center text-grey-darkest mb-6">{defaultValues ? `Modifier la ${defaultValues.brand} ${defaultValues.model} ${defaultValues.label}` : 'Ajouter une nouvelle Sneaker'}</h1>
            <form className="grid gap-4 grid-cols-2 mb-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                    <label className="text-gray-600 font-light">Marque</label>
                    <select
                        className="w-full border bg-white rounded px-3 py-2 outline-none"
                        placeholder="Marque"
                        name="brand"
                        ref={register({ required: true })}>
                        <option className="py-1" value=""></option>
                        <option className="py-1" value="jordan">Jordan</option>
                        <option className="py-1" value="nike">Nike</option>
                        <option className="py-1" value="asics">Asics</option>
                    </select>
                    {errors.brand && requiredField()}
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-600 font-light">Modèle</label>
                    <input
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                        type="text"
                        id="model"
                        name="model"
                        placeholder="Modèle"
                        ref={register({ required: true })}
                    />
                    {errors.model && requiredField()}
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-600 font-light">Type</label>
                    <input
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                        type="text"
                        id="type"
                        placeholder="Type"
                        name="type"
                        ref={register({ required: true })}
                    />
                    {errors.type && requiredField()}
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-600 font-light">Taille</label>
                    <input
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                        type="number"
                        id="size"
                        placeholder="Taille"
                        name="size"
                        ref={register({ required: true })}
                    />
                    {errors.size && requiredField()}
                </div>
                <div className="flex flex-col col-span-full">
                    <label className="text-gray-600 font-light">Label</label>
                    <input
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                        type="text"
                        id="label"
                        placeholder="Label"
                        name="label"
                        ref={register({ required: true })}
                    />
                    {errors.label && requiredField()}
                </div>
                <div className="flex flex-col col-span-full">
                    <label className="text-gray-600 font-light">Shop</label>
                    <input
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                        type="text"
                        id="shop"
                        placeholder="Shop"
                        name="shop"
                        ref={register({ required: true })}
                    />
                    {errors.shop && requiredField()}
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-600 font-light">Acheté le </label>
                    <input
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                        type="date"
                        id="purchase_date"
                        placeholder="Jour d'achat"
                        name="purchase_date"
                        ref={register({ required: true })}
                    />
                    {errors.purchase_date && requiredField()}
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-600 font-light">à</label>
                    <div className="flex items-center">
                        <input
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                            type="number"
                            id="retail_price"
                            placeholder="Prix d'achat"
                            name="retail_price"
                            ref={register({ required: true })}
                        />
                        <FontAwesomeIcon className="w-4 h-4 fill-current text-gray-500 -ml-8 z-10" icon={faEuroSign} />
                    </div>
                    {errors.retail_price && requiredField()}
                </div>
                <div className="flex flex-col col-span-full justify-center items-center">
                    <label className="text-gray-600 font-light">Paire déjà vendue ?</label>
                    <input type="checkbox" name="already_buy" id="already_buy" ref={register()} defaultChecked={(defaultValues?.sale_date || defaultValues?.ressel_price) ? true : false} />
                </div>
                {already_buy && (
                    <>
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-light">Revendu le</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                                type="date"
                                id="sale_date"
                                placeholder="Jour de revente"
                                name="sale_date"
                                ref={register()}
                            />
                            {errors.sale_date && requiredField()}
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-light">à</label>
                            <div className="flex items-center">
                                <input
                                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                                    type="number"
                                    id="ressel_price"
                                    placeholder="Prix de revente"
                                    name="ressel_price"
                                    ref={register()}
                                />
                                <FontAwesomeIcon className="w-4 h-4 fill-current text-gray-500 -ml-8 z-10" icon={faEuroSign} />
                            </div>
                            {errors.ressel_price && requiredField()}
                        </div>
                    </>
                )}
                <div className="col-span-full  sm:flex sm:flex-row-reverse">
                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-100 sm:ml-3 sm:w-auto sm:text-sm">
                        Valider
        </button>
                    <button onClick={onClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Cancel
        </button>
                </div>
            </form>
        </div>

    );
};

export default Form;