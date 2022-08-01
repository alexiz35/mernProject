import React, {useState} from "react";
import Modal from "bootstrap/js/src/modal";
import PropTypes from "prop-types"

export const ModalEditUser = (props) => {
    const {userField} = props
    const [form, setForm] = useState({
        firstName: userField.firstName,
        lastName: userField.lastName,
        phone: userField.phone
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="firstName"
                                    value={form.firstName}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="firstName">{`FirstName: ${userField.firstName}`}</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="lastName"
                                    value={form.lastName}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="lastName">{`LastName: ${userField.lastName}`}</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="phone"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    placeholder="phone"
                                    value={form.phone}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="phone">{`Phone: ${userField.phone}`}</label>
                            </div>
                            <div className="mt-3 row">
                                <button
                                    type="button"
                                    data-bs-dismiss="modal"
                                    className="btn-dark btn me-3"
                                    onClick={() => {
                                        props.clickEdit(form)
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

ModalEditUser.defaultProps = {
    userField: {
        firstName: 'firstName',
        lastName: 'lastName',
        phone: 'phone'
    }
}

ModalEditUser.propTypes = {
    userField: PropTypes.object.isRequired
}

export const editUserHandler = () => {
    let myModal = new Modal(document.getElementById('staticBackdrop'),)
    myModal.show()
}