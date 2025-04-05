import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const PDS1 = () => {
  /* Start */
  /* Code for fetching the data in the person table in the database */
   const [userData, setUserData] = useState({
      username: '',
      role: '',
      employeeNumber: '',
    });

    const [personalInfo, setPersonalInfo] = useState(null); // To store fetched personal info
    const [collegeInfo, setCollegeInfo] = useState(null);
    const [vocationalInfo, setVocationalInfo] = useState(null);
    const [childrenInfo, setChildrenInfo] = useState(null);



    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUserData({
          username: decoded.username || 'Name not available',
          role: decoded.role || 'Role not available',
          employeeNumber: decoded.employeeNumber || 'Employee number not available',
        });
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }, []);

    // Fetching the personal info based on employee number
    const fetchItems = async () => {
        const { employeeNumber } = userData;
        if (!employeeNumber) return;

        try {
          const response = await axios.get(`http://localhost:5000/personalinfo/person_table/${employeeNumber}`);
          setPersonalInfo(response.data);
        } catch (error) {
          console.error('Error fetching personal info:', error);
        }

        try {
          const response = await axios.get(`http://localhost:5000/college/college-table/${employeeNumber}`);
          setCollegeInfo(response.data);
        } catch (error) {
          console.error('Error fetching personal info:', error);
        }

        try {
          const response = await axios.get(`http://localhost:5000/vocational/vocational-table/${employeeNumber}`);
          setVocationalInfo(response.data);
        } catch (error) {
          console.error('Error fetching personal info:', error);
        }

        try {
          const response = await axios.get(`http://localhost:5000/childrenRoute/children-table/${employeeNumber}`);
          setChildrenInfo(response.data);
        } catch (error) {
          console.error('Error fetching personal info:', error);
        }


    };

    

    // Fetch personal info when userData changes
    useEffect(() => {
      if (userData.employeeNumber) {
        fetchItems();
      }
    }, [userData.employeeNumber]);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{ overflow:'auto', border: '1px solid black', padding: '0.25in', width: '8in', height: '14.4in' }}>
    <table style={{ border: '1px solid black', borderCollapse: 'collapse', fontFamily: 'Arial, Helvetica, sans-serif', width: '8in', tableLayout: 'fixed' }}>
       
            <tbody>
               
                <tr>
                    <td colSpan="2" style={{ height: '0.1in', fontSize: '72.5%' }}>
                        <b><i>CS Form No. 212</i></b>
                    </td>
                    <td colSpan="1" style={{ height: '0.1in', fontSize: '72.5%' }}></td>
                    <td colSpan="1" style={{ height: '0.1in', fontSize: '72.5%' }}></td>
                    <td colSpan="1" style={{ height: '0.1in', fontSize: '72.5%' }}></td>
                    <td colSpan="1" style={{ height: '0.1in', fontSize: '72.5%' }}></td>
                    <td colSpan="1" style={{ height: '0.1in', fontSize: '72.5%' }}></td>
                    <td colSpan="1" style={{ height: '0.1in', fontSize: '72.5%' }}></td>
                    <td colSpan="1" style={{ height: '0.1in', fontSize: '72.5%' }}></td>
                    <td colSpan="1" style={{ height: '0.1in', fontSize: '72.5%' }}></td>
                    <td colSpan="1" style={{ height: '0.1in', fontSize: '72.5%' }}></td>
                    <td colSpan="1" style={{ height: '0.1in', fontSize: '72.5%' }}></td>
                    <td colSpan="1" style={{ height: '0.1in', fontSize: '72.5%' }}></td>
                    <td colSpan="1" style={{ height: '0.1in', fontSize: '72.5%' }}></td>
                    <td colSpan="1" style={{ height: '0.1in', fontSize: '72.5%' }}></td>
                </tr>


                <tr>
                    <td colSpan="2" style={{height:'0.11in', fontSize:'62.5%'}}>
                        <b> <i> Revised 2017</i></b>
                    </td>
                </tr>


                <tr>
                    <td colSpan="15" style={{ height: '0.5in' }}>
                        <h1 style={{ textAlign: 'center' }}><b>PERSONAL DATA SHEET</b></h1>
                    </td>
                </tr>


                <tr>
                <td colSpan="15" style={{height: '0.3in', fontSize: '62.5%'}}>
                    <b> <i> WARNING: Any misrepresentation made in the Personal Data Sheet and the Work Experience Sheet shall cause the filing of administrative/criminal case/s </i></b> <br></br>
                    <b> <i> against the person concerned.</i></b><br></br>
                    <b> <i> READ THE ATTACHED GUIDE TO FILLING OUT THE PERSONAL DATA SHEET (PDS) BEFORE ACCOMPLISHING THE PDS FORMS.</i></b>
                </td>
                </tr>


                <tr>
                    <td colSpan="11" style={{height:'0.11in', fontSize:'55%'}}>
                        Print legibly. Tick appropriate boxes (□) and use separate sheet if necessary. Indicate N/A if not applicable. <b> DO NOT ABBREVIATE.</b>
                    </td>
                    <td colSpan="1" style={{height:'0.11in', fontSize:'55%', backgroundColor:'gray', border:'1px solid black'}}>
                    1. CS ID No
                    </td>
                    <td colSpan="3" style={{height:'0.11in', fontSize:'50%', textAlign:'right', border:' 1px solid black'}}>
                    (Do not fill up. For CSC use only)
                    </td>
                </tr>


                <tr>
                    <td colSpan="15" style={{height: '0.2in', fontSize:'72.5%', backgroundColor: 'gray', color: 'white' }}>
                        <b> <i> I. PERSONAL INFORMATION</i></b>
                    </td>
                </tr>


                <tr>
                    <td colSpan="3" style={{height: '0.25in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px 1px 0px 1px solid black'}}>
                        2. &emsp; SURNAME
                    </td>
                    <td colSpan="12" style={{height: '0.25in', fontSize:'62.5%', border: '1px solid black', padding: '0'}}>
                    {personalInfo ? personalInfo.lastName : ''}
                    </td>
                </tr>


                <tr>
                    <td colSpan="3" rowSpan="2" style={{height:'0.25in', fontSize:'62.5%', backgroundColor:'lightgray', border:'0px 1px 0px 1px solid black'}}>
                        &emsp;&emsp; FIRST NAME
                    </td>
                    <td colSpan="9" rowSpan="2" style={{height: '0.125in', fontSize:'62.5%', border:'1px solid black'}}>
                    {personalInfo ? personalInfo.firstName : ''}

                    </td>


                    <td colSpan="3" style={{height:'0.125in', fontSize:'62.5%', border:'1px 1px 0px 1px solid black', backgroundColor:'lightgray' }}>
                    <sup>NAME EXTENSION (JR, SR) </sup>
                    </td>                        
                </tr>


                <tr>
                <td colSpan="3" style={{height:'0.125in', fontSize:'62.5%', border:'1px 1px 0px 1px solid black', backgroundColor:'lightgray' }}>
                    <sup> {personalInfo ? personalInfo.firstName : ''} 
                            </sup> </td>
                </tr>
                <tr>
                <td colSpan="3" style={{height:'0.125in', fontSize:'62.5%',backgroundColor:'lightgray', border:'0px 1px 1px 1px solid black'}}>
                &emsp;&emsp;MIDDLE NAME
                </td>
                <td colSpan="12"  style={{height:'0.125in', fontSize:'62.5%', border:'1px solid black'}}>
                {personalInfo ? personalInfo.middleName : ''} 
                    </td>
                </tr>


                <tr>
                <td colSpan="3" rowSpan="2" style={{height:'0.25in', fontSize:'62.5%', backgroundColor:'lightgray', border:'1px solid black'}}>
                3.&emsp;DATE OF BIRTH <br></br>
                <p> &emsp;&emsp;(mm/dd/yyyy) </p>
                </td>


                <td colSpan="4" rowSpan="2" style={{height:'0.25in', fontSize:'62.5%', border:'1px solid black'}}>
                   
                {personalInfo ? personalInfo.birthDate : ''} 
                </td>


                <td colSpan="3" rowSpan="4" style={{height:'0.25in', fontSize:'62.5%', backgroundColor:'lightgray', border:'1px solid black', verticalAlign:'top'}}>
                    16.&emsp; CITIZENSHIP <br></br>
                    &emsp;&emsp;If holder of dual citizenship, <br></br>
                    &emsp;&emsp;please indicate the details
                </td>
                <td colSpan="5"  style={{height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                &nbsp;
                </td>
            </tr>


            <tr>
                <td colSpan="5" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
               &nbsp;
                </td>
            </tr>    


            <tr>
                <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    4.&emsp;PLACE OF BIRTH
                </td>
                <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                &nbsp;
                </td>
            </tr>




            <tr>
                <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                5.&emsp;SEX
                </td>
                <td colSpan="5" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                &nbsp;
                </td>
            </tr>


            <tr>
                <td colSpan="3" rowSpan="4" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black', verticalAlign: 'top' }}>
                    <br />
                    6.&emsp;CIVIL STATUS
                </td>
                <td colSpan="4" rowSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.civilStatus : ''} 
                </td>
                <td colSpan="2" rowSpan="6" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black', verticalAlign: 'top' }}>
                    <br />
                    17.&emsp;RESIDENTIAL&emsp;&emsp;ADDRESS
                </td>


                <td colSpan="6" style={{ height: '0.15in', fontSize: '62.5%', border: '1px solid black', textAlign:'center',}}>
                {personalInfo ? personalInfo.houseBlockLotNum : ''} &emsp; &emsp; &emsp; &emsp; {personalInfo ? personalInfo.streetName : ''} 
                   
                </td>
            </tr>
            <tr>
                <td colSpan="3" style={{ height: '0.1in', fontSize: '55%', border: '1px solid gray white black black', textAlign: 'center' }}>
                    <i>House/Block/Lot No.</i>
                </td>
                <td colSpan="3" style={{ height: '0.1in', fontSize: '55%', border: '1px solid gray white black black', textAlign: 'center' }}>
                    <i>Street</i>
                </td>
            </tr>
            <tr>
               
            <td colSpan="6" style={{ height: '0.15in', fontSize: '62.5%', border: '1px solid black', textAlign:'center' }}>
            {personalInfo ? personalInfo.subdivisionOrVillage : ''} &emsp;&emsp;&emsp;&emsp; {personalInfo ? personalInfo.barangayName : ''}
                </td>
               
            </tr>
            <tr>
                <td colSpan="3" style={{ height: '0.1in', fontSize: '55%', border: '1px solid gray black black white', textAlign: 'center' }}>
                    <i>Subdivision/Village</i>
                </td>
                <td colSpan="3" style={{ height: '0.1in', fontSize: '55%', border: '1px solid gray black black white', textAlign: 'center' }}>
                    <i>Barangay</i>
                </td>
            </tr>
            <tr>
                <td colSpan="3" rowSpan="2" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    7.&emsp;HEIGHT (m)
                </td>
                <td colSpan="4" rowSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.heightCm : ''}
                </td>
                <td colSpan="6" style={{ height: '0.15in', fontSize: '62.5%', border: '1px solid black', textAlign:'center' }}>
                {personalInfo ? personalInfo.cityOrMunicipality : ''} &emsp; &emsp;&emsp;&emsp; {personalInfo ? personalInfo.provinceName : ''}
                </td>
            </tr>
            <tr>
                <td colSpan="3" style={{ height: '0.1in', fontSize: '55%', border: '1px solid gray black black black', textAlign: 'center' }}>
                    <i>City/Municipality</i>
                </td>
               
                <td colSpan="3"  
                style={{ height: '0.1in', fontSize: '55%', border: '1px solid gray black black black', textAlign: 'center' }}>
                    <i>Province</i>
                </td>
               
            </tr>
            <tr>
                <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    8.&emsp;WEIGHT (kg)
                </td>
                <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.weightKg : ''}
                </td>
                <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black black gray black', textAlign: 'center' }}>
                    ZIP CODE
                </td>
                <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.zipcode : ''}
                </td>
            </tr>


            <tr>
                <td colSpan="3" rowSpan="2" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    9.&emsp;BLOOD TYPE
                </td>
                <td colSpan="4" rowSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.bloodType : ''}
                </td>
                <td colSpan="2" rowSpan="6" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black', verticalAlign: 'top' }}>
                    <br />
                    18.&emsp;PERMANENT
                    &emsp;&emsp; ADDRESS
                </td>
                <td colSpan="6" style={{ height: '0.15in', fontSize: '62.5%', border: '1px solid black' }}>
                &nbsp;
                </td>
            </tr>
            <tr>
                <td colSpan="3" style={{ height: '0.1in', fontSize: '55%', border: '1px solid gray white black black', textAlign: 'center' }}>
                    <i>House/Block/Lot No.</i>
                </td>
                <td colSpan="3" style={{ height: '0.1in', fontSize: '55%', border: '1px solid gray white black black', textAlign: 'center' }}>
                    <i>Street</i>
                </td>
            </tr>


            <tr>
                <td colSpan="3" rowSpan="2" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    10.&emsp;GSIS ID NO.
                </td>
                <td colSpan="4" rowSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.gsisNum : ''}
                </td>
                <td colSpan="6" style={{ height: '0.15in', fontSize: '62.5%', border: '1px solid black' }}>
                     
                </td>
            </tr>
            <tr>
                <td colSpan="3" style={{ height: '0.1in', fontSize: '55%', border: '1px solid gray black black black', textAlign: 'center' }}>
                    <i>Subdivision/Village</i>
                </td>
                <td colSpan="3" style={{ height: '0.1in', fontSize: '55%', border: '1px solid gray black black black', textAlign: 'center' }}>
                    <i>Barangay</i>
                </td>
            </tr>


            <tr>
                <td colSpan="3" rowSpan="2" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    11.&emsp;PAG-IBIG ID NO.
                </td>
                <td colSpan="4" rowSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.pagibigNum : ''}
                </td>
                <td colSpan="6" style={{ height: '0.15in', fontSize: '62.5%', border: '1px solid black' }}>
                &nbsp;
                </td>
            </tr>


            <tr>
                <td colSpan="3" style={{ height: '0.1in', fontSize: '55%', border: '1px solid gray black black black', textAlign: 'center' }}>
                    <i>City/Municipality</i>
                </td>
                <td colSpan="3" style={{ height: '0.1in', fontSize: '55%', border: '1px solid gray black black black', textAlign: 'center' }}>
                    <i>Province</i>
                </td>
            </tr>


            <tr>
                <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    12.&emsp;PHILHEALTH NO.
                </td>
                <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.philhealthNum : ''}
                </td>
                <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid gray black black black', textAlign: 'center' }}>
                    ZIP CODE
                </td>
                <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                &nbsp;
                </td>
            </tr>
            <tr>
                <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    13.&emsp;SSS NO.
                </td>
                <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.sssNum : ''}
                </td>  
                <td colSpan="2" style={{ height: '0.25in', fontSize: '57.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    19.&emsp;TELEPHONE NO.
                </td>
                <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.telephone : ''}
                </td>          
            </tr>
            <tr>
                <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    14.&emsp;TIN NO.
                </td>
                <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.tinNum : ''}
                </td>  
                <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    20.&emsp;MOBILE NO.
                </td>
                <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.mobileNum : ''}
                </td>          
            </tr>
            <tr>
                <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    15.&emsp;AGENCY EMPLOYEE NO.
                </td>
                <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {userData.employeeNumber}
                </td>  
                <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    21. E-MAIL ADDRESS (if any)
                </td>
                <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.emailAddress : ''}
                </td>          
            </tr>
            <tr>
                <td colSpan="15" style={{ height: '0.2in', fontSize: '72.5%', backgroundColor: 'gray', color: 'white' }}>
                    <b><i>II. FAMILY BACKGROUND</i></b>
                </td>
            </tr>


            <tr>
                <td colSpan="3" rowSpan="4" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                22.&emsp;SPOUSE'S SURNAME<br />
                    <br />
                    &emsp;&emsp; FIRST NAME<br />
                    <br />
                    &emsp;&emsp; MIDDLE NAME
                </td>
                <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
                {personalInfo ? personalInfo.spouseLastName : ''}
                </td>
               
               
                <td colSpan="4" style={{ height: '0.25in', fontSize: '52.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                    23. NAME of CHILDREN (Write full name and list all)
                </td>
               
                <td colSpan="2" style={{ height: '0.25in', fontSize: '52.5%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
                    DATE OF BIRTH<br />
                    (mm/dd/yyyy)
                </td>      
            </tr>
            <tr>
            <td colSpan="4" rowSpan="2" style={{ height: '0.125in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.spouseFirstName : ''}
            </td>
            <td colSpan="2" style={{ height: '0.125in', fontSize: '47.5%', backgroundColor: 'lightgray', border: '1px 1px 0px 1px solid black' }}>
                NAME EXTENSION (JR, SR)
            </td>
            <td colSpan="4" rowSpan="2" style={{ height: '0.125in', fontSize: '52.5%', border: '1px solid black' }}>
            {childrenInfo ? childrenInfo.childrenFirstName : ''}
            </td>
            <td colSpan="2" rowSpan="2" style={{ height: '0.125in', fontSize: '52.5%', border: '1px solid black' }}>
            {childrenInfo ? childrenInfo.dateOfBirth : ''}
            </td>
        </tr>
        <tr>
            <td colSpan="2" style={{ height: '0.125in', fontSize: '52.5%', backgroundColor: 'lightgray', border: '0px 1px 1px 1px solid black' }}>
            {personalInfo ? personalInfo.spouseNameExtension : ''}
            </td>
        </tr>
        <tr>
            <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.spouseMiddleName : ''}
            </td>
            <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {childrenInfo ? childrenInfo.childrenFirstName : ''}
            </td>
            <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {childrenInfo ? childrenInfo.dateOfBirth : ''}
            </td>      
        </tr>
        <tr>
            <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                OCCUPATION<br />
            </td>
            <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.spouseOccupation : ''}
            </td>
            <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>
            <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>      
        </tr>
        <tr>
            <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                EMPLOYER/BUSINESS NAME<br />
            </td>
            <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.spouseEmployerBusinessName : ''}
            </td>
            <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>
            <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>      
        </tr>
        <tr>
            <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                BUSINESS ADDRESS<br />
            </td>
            <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.spouseBusinessAddress : ''}
            </td>
            <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>
            <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>      
        </tr>
        <tr>
            <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                TELEPHONE NO.<br />
            </td>
            <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.spouseTelephone : ''}
            </td>
            <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>
            <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>      
        </tr>
        <tr>
            <td colSpan="3" rowSpan="4" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                24. FATHER'S SURNAME<br />
                <br />
                &emsp;&emsp;FIRST NAME<br />
                <br />
                &emsp;&emsp;MIDDLE NAME
            </td>
            <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.fatherLastName : ''}
            </td>
            <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>
            <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>      
        </tr>
        <tr>
            <td colSpan="4" rowSpan="2" style={{ height: '0.125in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.fatherFirstName : ''}
            </td>
            <td colSpan="2" style={{ height: '0.125in', fontSize: '47.5%', backgroundColor: 'lightgray', border: '1px 1px 0px 1px solid black' }}>
                NAME EXTENSION (JR, SR)
            </td>
            <td colSpan="4" rowSpan="2" style={{ height: '0.125in', fontSize: '52.5%', border: '1px solid black' }}>
            &nbsp;
            </td>
            <td colSpan="2" rowSpan="2" style={{ height: '0.125in', fontSize: '52.5%', border: '1px solid black' }}>
            &nbsp;
            </td>
        </tr>
        <tr>
            <td colSpan="2" style={{ height: '0.125in', fontSize: '52.5%', backgroundColor: 'lightgray', border: '0px 1px 1px 1px solid black' }}>
            {personalInfo ? personalInfo.fatherNameExtension : ''}
            </td>
        </tr>
        <tr>
            <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.fatherMiddleName : ''}
            </td>
            <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>
            <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>      
        </tr>
        <tr>
            <td colSpan="9" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px 1px 0px 1px solid black' }}>
                25. MOTHER'S MAIDEN NAME
            </td>
            <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>
            <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
            </td>      
        </tr>
        <tr>
        <td colSpan="3" rowSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '0px 1px 1px 1px solid black' }}>
            SURNAME<br />
            <br />
            FIRST NAME<br />
            <br />
            MIDDLE NAME
        </td>
        <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {personalInfo ? personalInfo.motherMaidenLastName : ''}
        </td>
        <td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        &nbsp;
        </td>
        <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        &nbsp;
        </td>
    </tr>
    <tr>
        <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {personalInfo ? personalInfo.motherMaidenFirstName : ''}
        </td>
        <td colSpan="4" style={{ height: '0.25in', fontSize: '52.5%', border: '1px solid black' }}>
        &nbsp;
        </td>
        <td colSpan="2" style={{ height: '0.25in', fontSize: '52.5%', border: '1px solid black' }}>
        &nbsp;
        </td>
    </tr>
    <tr>
        <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {personalInfo ? personalInfo.motherMaidenFirstName : ''}
        </td>
        <td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', color: 'red', border: '1px solid black', textAlign: 'center' }}>
            <b><i>(Continue on separate sheet if necessary)</i></b>
        </td>
    </tr>


    <tr>
        <td colSpan="15" style={{ height: '0.2in', fontSize: '72.5%', backgroundColor: 'gray', color: 'white' }}>
            <b><i>III. EDUCATIONAL BACKGROUND</i></b>
        </td>
    </tr>
    <tr>
        <td colSpan="1" rowSpan="2" style={{ height: '0.3in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px 1px 1px 0px solid black' }}>
            26.
        </td>
        <td colSpan="2" rowSpan="2" style={{ height: '0.3in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px 0px 1px 1px solid black', textAlign: 'center' }}>
            LEVEL
        </td>
        <td colSpan="3" rowSpan="2" style={{ height: '0.3in', fontSize: '52.5%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
            NAME OF SCHOOL<br />
            (Write in full)
        </td>
        <td colSpan="3" rowSpan="2" style={{ height: '0.3in', fontSize: '50%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
            BASIC EDUCATION/DEGREE/COURSE<br />
            (Write in full)
        </td>
        <td colSpan="2" style={{ height: '0.3in', fontSize: '50%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
            PERIOD OF<br />
            ATTENDANCE
        </td>
        <td colSpan="2" rowSpan="2" style={{ height: '0.3in', fontSize: '50%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
            HIGHEST LEVEL/<br />
            UNITS EARNED<br />
            (if not graduated)
        </td>
        <td colSpan="1" rowSpan="2" style={{ height: '0.3in', fontSize: '50%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
            YEAR<br />
            GRADUATED
        </td>
        <td colSpan="1" rowSpan="2" style={{ height: '0.3in', fontSize: '40%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
            SCHOLARSHIP/<br />
            ACADEMIC<br />
            HONORS<br />
            RECEIVED
        </td>
    </tr>
    <tr>
        <td colSpan="1" style={{ height: '0.1in', fontSize: '50%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
            From
        </td>
        <td colSpan="1" style={{ height: '0.1in', fontSize: '50%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
            To
        </td>
    </tr>
    <tr>
        <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
            ELEMENTARY<br />
        </td>
        <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {personalInfo ? personalInfo.elementaryNameOfSchool : ''}
        </td>
        <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {personalInfo ? personalInfo.elementaryDegree : ''}
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {personalInfo ? personalInfo.elementaryPeriodFrom : ''}
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {personalInfo ? personalInfo.elementaryPeriodTo : ''}

        </td>
        <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {personalInfo ? personalInfo.elementaryHighestAttained : ''}

        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {personalInfo ? personalInfo.elementaryYearGraduated : ''}

        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {personalInfo ? personalInfo.elementaryScholarshipAcademicHonorsReceived : ''}

        </td>
    </tr>
        <tr>
            <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
                SECONDARY
            </td>
            <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.secondaryNameOfSchool : ''}
            </td>
            <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.secondaryDegree : ''}

            </td>
            <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.secondaryPeriodFrom : ''}

            </td>
            <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.secondaryPeriodTo : ''}

            </td>
            <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.secondaryHighestAttained : ''}

            </td>
            <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.secondaryYearGraduated : ''}

            </td>
            <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            {personalInfo ? personalInfo.secondaryScholarshipAcademicHonorsReceived : ''}

            </td>
        </tr>
        <tr>
        <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
            VOCATIONAL/TRADE COURSE
        </td>
        <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {vocationalInfo ? vocationalInfo.vocationalNameOfSchool : ''}
        </td>
        <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {vocationalInfo ? vocationalInfo.vocationalDegree : ''}
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {vocationalInfo ? vocationalInfo.vocationalPeriodFrom : ''}
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {vocationalInfo ? vocationalInfo.vocationalPeriodTo : ''}
        </td>
        <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {vocationalInfo ? vocationalInfo.vocationalHighestAttained : ''}
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {vocationalInfo ? vocationalInfo.vocationalYearGraduated : ''}
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {vocationalInfo ? vocationalInfo.vocationalScholarshipAcademicHonorsReceived : ''}
        </td>
                </tr>
    <tr>
        <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
            COLLEGE
        </td>
        <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {collegeInfo ? collegeInfo.collegeNameOfSchool : ''}
        </td>
        <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {collegeInfo ? collegeInfo.collegeDegree : ''}
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {collegeInfo ? collegeInfo.collegePeriodFrom : ''}
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {collegeInfo ? collegeInfo.collegePeriodTo : ''}
        </td>
        <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {collegeInfo ? collegeInfo.collegeHighestAttained : ''}
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {collegeInfo ? collegeInfo.collegeYearGraduated : ''}
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
        {collegeInfo ? collegeInfo.collegeScholarshipAcademicHonorsReceived : ''}
        </td>
    </tr>
    <tr>
        <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
            GRADUATE STUDIES<br />
        </td>
        <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
        </td>
        <td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
        </td>
        <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
        </td>
        <td colSpan="1" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
        </td>
    </tr>
    <tr>
        <td colSpan="15" style={{ height: '0.1in', fontSize: '55%', backgroundColor: 'lightgray', color: 'red', border: '1px solid black', textAlign: 'center' }}>
            <b><i>(Continue on separate sheet if necessary)</i></b>
        </td>
    </tr>
    <tr>
<td colSpan="3" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
<b><i>SIGNATURE</i></b>
</td>
<td colSpan="6" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
&nbsp;
</td>
<td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
<b><i>DATE</i></b>
</td>
<td colSpan="4" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
&nbsp;
</td>
    </tr>
    <tr>
        <td colSpan="15" style={{ height: '0.1in', fontSize: '50%', border: '1px solid white', textAlign: 'right' }}>
            <i>CS FORM 212 (Revised 2017), Page 1 of 4</i>
        </td>
    </tr>



   




</tbody>




</table>







   
</div>

</div>
  );
};

export default PDS1;
