import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';

import { Sneaker } from './index.d'

type Props = {
    onClose: () => void
}

const Form = ({ onClose }: Props) => {
    const { register, errors, handleSubmit, formState, getValues } = useForm<Sneaker>({ mode: "onChange" });
    const requiredField = () => <p className="text-red-500 text-xs">Champ obligatoire</p>


    const onSubmit = (data: Sneaker) => {
        console.log("data", data);
    };

    return (

        <div className="relative w-full md:max-w-sm md:mx-auto">
            <h1 className="block w-full text-center text-grey-darkest mb-6">Add new sneaker</h1>
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
                {getValues("brand") && (

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

                )}
                {getValues("model") && (
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

                )}
                {getValues("type") && (
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-light">Taille</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                            type={getValues("type") ? "number" : "hidden"}
                            id="size"
                            placeholder="Taille"
                            name="size"
                            ref={register({ required: true })}
                        />
                        {errors.brand && requiredField()}
                    </div>
                )}
                {getValues("size") && (
                    <div className="flex flex-col col-span-full">

                        <label className="text-gray-600 font-light">Label</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                            type={getValues("size") ? "text" : "hidden"}
                            id="label"
                            placeholder="Label"
                            name="label"
                            ref={register({ required: true })}
                        />
                        {errors.label && requiredField()}

                    </div>
                )}
                {getValues("label") && (
                    <div className="flex flex-col col-span-full">
                        <label className="text-gray-600 font-light">Shop</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                            type={getValues("label") ? "text" : "hidden"}
                            id="shop"
                            placeholder="Shop"
                            name="shop"
                            ref={register({ required: true })}
                        />
                        {errors.shop && requiredField()}
                    </div>

                )}
                {getValues("shop") && (
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-light">Acheté le </label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                            type="date"
                            id="purchase_date"
                            placeholder="Jourd d'achat"
                            name="purchase_date"
                            ref={register({ required: true })}
                        />
                        {errors.purchase_date && requiredField()}
                    </div>
                )}
                {getValues("purchase_date") && (
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
                )}
                {getValues("retail_price") && (
                    <div className="flex flex-col col-span-full justify-center items-center">
                        <label className="text-gray-600 font-light">Paire déjà vendue ?</label>
                        <input type="checkbox" name="already_buy" id="already_buy" ref={register()} />
                    </div>
                )}
                {getValues("already_buy") && (
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
                )}
                {getValues("sale_date") && (
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
                )}
                <div className="col-span-full  sm:flex sm:flex-row-reverse">
                    <button type="submit" disabled={!formState.isValid} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-100 sm:ml-3 sm:w-auto sm:text-sm">
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