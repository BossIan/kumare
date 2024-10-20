import { setDoc, signOut, listDocs, uploadFile } from "@junobuild/core";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./Auth";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import './newUser.css'
function NewUser() {
  const [key, setKey] = useState('')
  const [version, setVersion] = useState(1)
    const navigate = useNavigate();
    const list = async () => {
    const {items} = await listDocs({
      collection: 'users',
    });
    if (items[0]?.key !== undefined) {
        setKey(items[0].key)
        setVersion(items[0].version)
    } else {
        setKey(nanoid())
        setVersion(1)
    }
  };

  useEffect(() => {
    (async () => await list())();
  }, []);
    const [cityOptions, setCityOptions] = useState(['Baler', 'Casiguran', 'Maria Aurora', 'Dilasag', 'Dipaculao']);
    const [cityOptions2, setCityOptions2] = useState([]);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        birthMonth: '',
        birthDay: '',
        birthYear: '',
        birthProvince: '',
        birthCity: '',
        civilStatus: 'single',
        gender: 'male',
        email: '',
        contactNumber: '',
        altContactNumber: '',
        province: "Aurora",
        city: "Baler",
        street: '',
        postalCode: '',
        addressSame: '',
        selectId: 'Passport',
        creditScore: 650,
      });
      
    const [ step, setStep ] = useState(1);
    const citiesByProvince = {
        'Aurora': ['Baler', 'Casiguran', 'Maria Aurora', 'Dilasag', 'Dipaculao'],
        'Bataan': ['Balanga', 'Dinalupihan', 'Mariveles', 'Orani', 'Pilar'],
        'Bulacan': ['Malolos', 'Meycauayan', 'San Jose del Monte', 'Hagonoy', 'Baliuag'],
        'Nueva Ecija': ['Cabanatuan', 'Gapan', 'Palayan', 'San Jose', 'Talavera'],
        'Pampanga': ['San Fernando', 'Angeles City', 'Mabalacat', 'Mexico', 'Apalit'],
        'Tarlac': ['Tarlac City', 'Concepcion', 'Capas', 'Paniqui', 'Gerona'],
        'Zambales': ['Olongapo', 'Iba', 'Subic', 'Botolan', 'San Marcelino']
      }
    function goBack() {
        signOut().then(navigate("/"))
    }
    async function save() {
        try {
            // const filename = `${key}-${file.name}`;
            // await uploadFile({
            // collection: 'images',
            // data: file,
            // filename
            // });
            await setDoc({
              collection: "users",
              doc: {
                key,
                data: formData,
                version: version
            }
            });
            navigate("/dashboard")
        return
    } catch (error) {
            console.log(error);
    }
    }
    const handleChange = (e) => {
        var { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
        
        if (name == 'province') {
            updateCities(value)
        } else if (name == 'birthProvince'){
        updateCities2(value)
        }
      };
    function updateCities(e) {
        const province = e;
        setCityOptions(citiesByProvince[province] || []);  
    };
    function updateCities2(e) {
        const province = e;
        setCityOptions2(citiesByProvince[province] || []);  
    };
    if (step == 1) {
        return(
        <div className="newUser">
            <div className="backButton" onClick={goBack}>
                <img src="./new user/back.png" alt="back img" />
                <p>Back</p>
            </div>
            <div className="newUser-content1">
                <h1>Personal Information</h1>
                <p>We want to get know to you, Kumare!</p>
                <button onClick={() =>setStep(2)}>Continue</button>
            </div>
            <footer></footer>
        </div>
        )
    } else if (step == 2) {
        return(
        <div className="newUser">
            <div className="backButton" onClick={() => setStep(1)}>
                <img src="./new user/back.png" alt="back img" />
                <p>Back</p>
            </div>
            <form action={() => setStep(3)}>
                <div  className="newUser-content2">
                <div className="column">
                <label htmlFor="firstName">Legal First Name (as seen on your ID):</label>
                <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="Juana"
                    value={formData.firstName}
                    onChange={handleChange}
                />

                <label htmlFor="middleName">Legal Middle Name (as seen on your ID):</label>
                <input
                    type="text"
                    name="middleName"
                    required
                    placeholder="Dela"
                    value={formData.middleName}
                    onChange={handleChange}
                />

                <label htmlFor="lastName">Legal Last Name (as seen on your ID):</label>
                <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Cruz"
                    value={formData.lastName}
                    onChange={handleChange}
                />

                <label>Date of Birth mm/dd/yyyy</label>
                <div className="date">
                    <input
                    type="number"
                    name="birthMonth"
                    required
                    placeholder="MM"
                    min="1"
                    max="12"
                    value={formData.birthMonth}
                    onChange={handleChange}
                    />
                    <input
                    type="number"
                    name="birthDay"
                    required
                    min="1"
                    max="31"
                    placeholder="DD"
                    value={formData.birthDay}
                    onChange={handleChange}
                    />
                    <input
                    type="number"
                    name="birthYear"
                    required
                    placeholder="YYYY"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.birthYear}
                    onChange={handleChange}
                    />
                </div>

                <label htmlFor="birthProvince">Place of Birth</label>
                <select
                    id="birthProvince"
                    name="birthProvince"
                    onChange={handleChange}
                    defaultValue={"Province"}
                    value={formData.birthProvince}
                    required
                >
                    <option disabled value="">
                    Province
                    </option>
                    <option value="Aurora">Aurora</option>
                    <option value="Bataan">Bataan</option>
                    <option value="Bulacan">Bulacan</option>
                    <option value="Nueva Ecija">Nueva Ecija</option>
                    <option value="Pampanga">Pampanga</option>
                    <option value="Tarlac">Tarlac</option>
                    <option value="Zambales">Zambales</option>
                </select>

                <select
                    id="birthCity"
                    name="birthCity"
                    value={formData.birthCity}
                    onChange={handleChange}
                    required
                >
                    <option disabled value="">
                    City
                    </option>
                    {cityOptions2.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                        ))}
                </select>
                </div>
                <div className="column">
                <label htmlFor="status">Civil Status</label>
                    <select
                        id="status"
                        name="civilStatus"
                        value={formData.civilStatus}
                        onChange={handleChange}
                    >
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Separated">Separated</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Annulled">Annulled</option>
                    </select>

                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="number">Contact Number</label>
                    <input
                        type="number"
                        className="number"
                        name="contactNumber"
                        required
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />

                    <label htmlFor="altNumber">Alternative Contact Number</label>
                    <input
                        type="number"
                        className="number"
                        name="altContactNumber"
                        required
                        value={formData.altContactNumber}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <button type="submit">Save and Continue</button>
            </form>
            <footer></footer>
        </div>
        )
    } else if (step == 3) {
        return(
        <div className="newUser">
            <div className="backButton" onClick={() => setStep(2)}>
                <img src="./new user/back.png" alt="back img" />
                <p>Back</p>
            </div>
            <form action={save}>
                    <h2>Tell us more about yourself</h2>
                    <div  className="newUser-content3">
                    <div className="column">
                        <label htmlFor="province">Address</label>
                        <select
                            id="province"
                            name="province"
                            onChange={handleChange}
                            value={formData.province}
                            required
                        >
                            <option  value="" disabled>
                            Province
                            </option>
                            <option value="Aurora">Aurora</option>
                            <option value="Bataan">Bataan</option>
                            <option value="Bulacan">Bulacan</option>
                            <option value="Nueva Ecija">Nueva Ecija</option>
                            <option value="Pampanga">Pampanga</option>
                            <option value="Tarlac">Tarlac</option>
                            <option value="Zambales">Zambales</option>
                        </select>

                        <select
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        >
                            <option  disabled  value="">
                            City
                            </option>
                            {cityOptions.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                                ))}
                        </select>

                        <label htmlFor="street">Permanent Street Address</label>
                        <input type="text"
                            id="street"
                            name="street"
                            placeholder="House # / Building / Street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="postal">Postal Code (Permanent Address)</label>
                        <input             
                            type="number"
                            id="postal"
                            name="postalCode"
                            placeholder="Enter 4-digit postal code"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                        />

                        <label>Is your Present address the same as your permanent address?</label>
                        <div className="radio-group">
                            <label><input type="radio"
                                name="addressSame"
                                value="yes"
                                checked={formData.addressSame === 'yes'}
                                onChange={handleChange}
                                required
                            /> Yes</label>
                            <label><input  type="radio"
                                name="addressSame"
                                value="no"
                                checked={formData.addressSame === 'no'}
                                onChange={handleChange}
                                required
                            /> No</label>
                        </div>
                    </div>

                    <div className="column">
                        <label htmlFor="selectId">Select ID</label>
                        <select  
                            id="selectId"
                            name="selectId"
                            value={formData.selectId}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled selected>Select Answer</option>
                            <option value="passport">Passport</option>
                            <option value="driversLicense">Driver's License</option>
                            <option value="nationalId">National ID</option>
                        </select>

                        <div className="submitFile">
                            <label>Attach Copy of ID</label>
                            <label htmlFor="file" className="btn-dashboard"><img src="./new user/addFile.png" alt="addfile" /><p>Add File</p></label>
                            <input
                                id="file"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                        setFile(URL.createObjectURL(event.target.files[0]))
                                }}
                                style={{display:`none`}}
                                required
                        />
                        </div>
                        <img className="displayImg" src={file}/>
                        
                        <div className="checkbox-group">
                            <input type="checkbox" name="confirm" required/> 
                            <label>
                                I confirm that the answer I selected above is true and understand that answering dishonestly will disqualify me.
                            </label>
                        </div>
                </div>
            </div>
            <button type="submit">Save and Continue</button>
            </form>
            <footer></footer>
        </div>
        )
    }

}

export default NewUser;

