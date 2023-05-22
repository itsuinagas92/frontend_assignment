// Your application goes here
// import { useState, useEffect } from "react";
// const { useState, useEffect } = require("react");

function App() {

    let [formFieldsList, setFormsList] = React.useState([]);
    let [formValues, setFormValue] = React.useState({});

    async function getData() {
        try {
            const url = "https://mocki.io/v1/84954ef5-462f-462a-b692-6531e75c220d";
            const data = await fetch(url).then(response => response.json());
            // fetch('https://mocki.io/v1/84954ef5-462f-462a-b692-6531e75c220d')
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log(data); // Log the retrieved JSON data
            //         // Use the data as needed
            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //     });
            // formFieldsList = data;

            const dd = {};

            for (let row of data) {
                dd[row.name] = "";
                dd[row.name + 'Error'] = "";
            }

            setFormValue(dd);


            setFormsList(data);

            console.log(data, " Dataaa");
            // return data;
        } catch (error) {
            console.log("Errororor: ", error);
            // return [];
        }
    }

    async function submitData(data) {
        // e.preventDefault();
        const url = "https://0211560d-577a-407d-94ab-dc0383c943e0.mock.pstmn.io/submitform";
        const response = await fetch(url, {
            method: "POST",
            body: data,
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json());
        console.log(response, " response");

        // form reset
        const dd = {};

        for (let row of formFieldsList) {
            dd[row.name] = "";
            dd[row.name + 'Error'] = "";
        }

        setFormValue(dd);


    }

    React.useEffect(() => {

        getData();


    }, []);


    function setFormField(value, name) {
        // console.log(" daddad in form change", index, value, formValues);

        setFormValue(prev => { return { ...prev, [name]: value } });


    }
    function submitForm(e) {
        e.preventDefault();

        // validations 

        let dd = { ...formValues };
        let errFound = 0;
        const finalFormData = [];

        for (const row of formFieldsList) {
            if (row.required && !dd[row.name]) {
                dd[row.name + 'Error'] = `${row.label || row.legend} is required`;
                errFound = 1;
            } else {
                dd[row.name + 'Error'] = "";
            }
            finalFormData.push({
                name: row.name,
                value: formValues[row.name]
            })

        }

        setFormValue(dd);

        if (errFound) {
            // throw error
        } else {
            // const finalFormData = [];

            // for (const key in formValues) {

            //     finalFormData.push({
            //         name: key,
            //         value: formValues[key]
            //     })
            // }
            console.log(formValues, " FInal form data ", finalFormData);

            // api call

            submitData(finalFormData);
        }
    }


    return (
        <>
            <div className="container-fluid">
                <h1>Front-end Assignment!</h1>
                <br />

                <form>
                    <div className="row">
                        <div className="col-6">
                            {formFieldsList.map((ff, idx) => {

                                if (['text', 'tel', 'email'].includes(ff.type)) {
                                    return (
                                        <>
                                            <div className="form-group">
                                                <div key={ff.id} className="column">
                                                    <label>{ff.label || ff.legend}{ff.required ? <span style={{ color: "red" }}>*</span> : ""} </label>
                                                    <input className="form-control" type={ff.type} name={ff.name} pattern={ff.pattern || undefined}
                                                        required={formValues[ff.name + "Error"] ? true : false} value={formValues[ff.name]}
                                                        onChange={(e) => setFormField(e.target.value, ff.name)} />
                                                </div>
                                                <span className="color-red" key={idx}>{formValues[ff.name + "Error"]}</span>
                                            </div>
                                            <br />
                                        </>
                                    )
                                } else if (ff.type == 'radio') {
                                    return (
                                        <>
                                            <div className="form-group">
                                                <div key={ff.id} onChange={(e) => setFormField(e.target.value, ff.name)} value={formValues[ff.name]}>
                                                    <label className="form-check-label">{ff.label || ff.legend}{ff.required ? <span style={{ color: "red" }}>*</span> : ""} </label>

                                                    <div className="form-check-inline">
                                                        {ff.options.map((fo) => {
                                                            return (
                                                                <>
                                                                    <input className="form-check-input form-control" style={{ height: '30px' }} key={fo.id} type="radio" value={fo.value} name="gender" /> {fo.label}
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                <span className="color-red" key={idx}>{formValues[ff.name + "Error"]}</span>
                                            </div>
                                            <br />
                                        </>
                                    )
                                }

                            })}
                            <br />
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={(e) => submitForm(e)}>Submit</button>
                </form>
            </div>
        </>

    );


}

ReactDOM.render(<App />, document.getElementById('root'));
