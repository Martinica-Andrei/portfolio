import React, { useEffect, useCallback} from "react";

const ModalBackground = ({ children, display, setDisplay, divAttributes }) => {

    const closeWithEsc = useCallback((e)=>{
        if (e.key === 'Escape'){
            setDisplay(false)
        }
    }, [setDisplay])

    useEffect(()=>{
        if (display){
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', closeWithEsc)
        }
        else{
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', closeWithEsc)
        }

    }, [display])

    return (
        <>
            {display &&
                <div className="modal-background" {...divAttributes}>
                    {children}
                </div>
            }
        </>
    )
}

export default ModalBackground