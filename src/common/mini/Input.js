import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";


const Input = ({
                   status,
                   value,
                   onChange,
                   maxLength,
                   onBlur,
                   id,
                   autoComplete,
                   type,
                   name,
                   className,
                   placeholder,
                   label,
                   classNameLabel,
                   style,
                   disabled,
                   onFocus,

               }) => {
    const [eye, setEye] = useState(faEyeSlash)
    const inputRef = useRef(null);
    return (
        <>
            <span className={classNameLabel}>{label}</span>
            <div className="input-block">
                <input
                    style={style}
                    ref={inputRef}
                    name={name}
                    onBlur={onBlur}
                    id={id}
                    autoComplete={autoComplete}
                    type={
                        (name === "password" || type === "password") && eye === faEyeSlash
                            ? "password"
                            : name === "repeatPassword" && eye === faEyeSlash
                                ? "password"
                                : name === "logo"
                                    ? "file"
                                    : "text"
                    }
                    maxLength={maxLength}
                    className={className}
                    placeholder={placeholder}
                    value={name === "logo" ? undefined : value}
                    onChange={onChange}
                    disabled={status === "pending" || status === "ok" || disabled}
                    accept={name === "logo" ? ".jpg, .jpeg, .png" : undefined}
                    onFocus={onFocus}
                />


                {name === "password" || name === "repeatPassword" || type === "password"
                    // && user[field.name].length
                    ?
                    <FontAwesomeIcon
                        onClick={() => {
                            setEye(eye === faEye
                                ? faEyeSlash : faEye)
                        }
                        } icon={eye}
                        className="eye"/> : null}
            </div>
        </>
    );
};

export default Input;
