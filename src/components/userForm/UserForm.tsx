import React, { useRef } from "react";
import "./NumberInput.css"
import "./FormInput.css"
import ColorInput from "../colorInput/ColorInput";
import { HAIR_COLORS, EYES_COLORS, SKIN_COLORS } from "../../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { RootState, userNumberKeys, userState, userStringKeys } from "../../redux/types";
import { fetchSetUserInfo } from "../../redux/reducers/user";
import Header from "../header/Header";

interface NumberInputType {
    element: JSX.Element,
    ref: React.RefObject<HTMLInputElement>,
    key: userNumberKeys,
}

export interface StringInputType {
    element: JSX.Element,
    currentColor: string,
    key: userStringKeys,
}

function UserForm () {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user)
    const hairInput: StringInputType = ColorInput('Цвет волос', HAIR_COLORS , 'hair');
    const eyeInput: StringInputType = ColorInput('Цвет глаз', EYES_COLORS, 'eyes');
    const skinInput: StringInputType = ColorInput('Цвет кожи', SKIN_COLORS, 'skin' )

    const numbersInput = [
        NumberInput('Обхват груди', 'см', 'chest'),
        NumberInput('Обхват талии', 'см', 'waist'),
        NumberInput('Обхват бедер', 'см', 'hips'),
        NumberInput('Рост', 'см', 'height'),
        NumberInput('Возраст', 'лет', 'age')
    ];
    const colorInputs  = [hairInput, eyeInput, skinInput];

 
    

    const submitForm = () => {
        const formValues = compileInputValues(getNumbersValues(numbersInput),getColorsValues(colorInputs))
        const generatedUser: userState = {...user, ...formValues};
        dispatch(fetchSetUserInfo(generatedUser))
    }

    const getNumbersValues = (inputs: NumberInputType[] ) => {
        return inputs.map(input => ({key: input.key, value: Number(input.ref.current?.value) || 0}))
    }

    const getColorsValues = (inputs: StringInputType[]) => {
        return inputs.map(input => ({key: input.key, value: input.currentColor}))
    }

    const compileInputValues = (numberValues: {key: userNumberKeys, value:  number}[], stringValues: {key: userStringKeys, value: string}[]) => {
        const response: userState = {...user};
        numberValues.map(value => {
            response[value.key] = value.value;
        })
        stringValues.map(value => {
            response[value.key] = value.value
        })
        return response;
    }
    

   
    return (
        <React.Fragment>
        <Header logoOnly/>
        <div className="userForm">
        <h2>Введите  свои данные</h2>
        {numbersInput.map((elements) => elements.element)}
        <div className='inputContainer'>
        {skinInput.element}
        </div>
        <div className='inputContainer'>
        {hairInput.element}
        </div>
        <div className='inputContainer'>
        {eyeInput.element}
        </div>
        
        <button className='btn sm useForm-button' onClick={submitForm}>Готово</button>
        </div>
        </React.Fragment>
    )
} 

export default UserForm

function NumberInput (title: string, postfix: string, key: userNumberKeys) : NumberInputType {
    const inputRef = useRef(null);

    return {
        element: (
            <div key={title} className="numberInput inputContainer">
                <span className="numberInput-title">{title}</span>
                <div className="numberInput-container">
                    <input type="number" ref={inputRef}/>
                    <span>{postfix}</span>
                </div>
            </div>
        ),
        ref: inputRef,
        key
    }
}