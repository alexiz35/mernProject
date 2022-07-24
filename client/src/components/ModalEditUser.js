import React, {useState} from "react";

export const ModalEditUser = () => {
    const [form,setForm] = useState({
        firstName: '',
        lastName: '',
        phone: ''
    })

    const changeHandler = (event) => {
        setForm({...form,[event.target.name]: event.target.value})
    }

    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="firstName"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">FirstName</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="LastName"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">LastName</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="phone"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Phone</label>
                            </div>
                            <div className="mt-3 row">
                                <button
                                    className="btn-dark btn me-3"
                                    /*style={{marginRight: 10}}*/
                                    /*disabled={loading}*/
                                    /*onClick={loginHandler}*/
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Understood</button>
                        </div>*/}
                    </div>
                </div>
            </div>

        </>
    )
}