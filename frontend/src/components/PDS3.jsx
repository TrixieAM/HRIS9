import React, {useEffect, useState} from "react";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import "../pages/css/components.css";
const PDS3 = () => {
    const [formData, setData] = useState([]); //store the voluntarywork
    const [formData2, setData2] = useState([]);
    const [formData3, setData3] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const [voluntaryWorkResponse, learningResponse, otherInfoResponse] = await Promise.all([
              axios.get("http://localhost:5000/voluntaryworkRoute/voluntarywork"),
              axios.get("http://localhost:5000/learning_and_development_table"),
              axios.get("http://localhost:5000/otherInfo/otherinformation"),
            ]);
            setData(voluntaryWorkResponse.data);
            setData2(learningResponse.data);
            setData3(otherInfoResponse.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchItems();
      }, []);


      const getEmployeeNumFromToken = () => {
        const token = localStorage.getItem("token");  // Get token from localStorage
        if (token) {
          const decoded = jwtDecode(token);
          console.log('Decoded Token:', decoded);
          return decoded.employeeNumber;  // Get the employeeNumber
        }
        return null;
      };
    //store the employeeNumber in a new variable 
      const employeeNum = getEmployeeNumFromToken();
    
        // Filter the data based on employeeNum
      const filteredFormData = formData.filter((data) => String(data.employeeID) === String(employeeNum));
      const filteredFormData2 = formData2.filter((data) => String(data.employeeID) === String(employeeNum));
      const filteredFormData3 = formData3.filter((data) => String(data.employeeID) === String(employeeNum));
      
      const maxRows = 7; // Define the maximum number of rows
      const maxRowsTable2 = 21;
      // Pad `data` with placeholders if it has fewer than `maxRows` rows
      const paddedData = [
        ...filteredFormData,
        ...Array.from({ length: Math.max(0, maxRows - formData.length) }, () => ({
            nameAndAddress: "",
            dateFrom: "",
            dateTo: "",
            numberOfHours: "",
            natureOfWork: ""
        })),
      ];

      const paddedDataTable2 = [
        ...filteredFormData2,
        ...Array.from({ length: Math.max(0, maxRowsTable2 - formData2.length) }, () => ({
            titleOfProgram: "", 
            dateFrom: "",
            dateTo: "",
            numberOfHours: "",
            typeOfLearningDevelopment: "",
                conductedSponsored: ""
        })),
      ];

      const paddedDataTable3 = [
        ...filteredFormData3,
        ...Array.from({ length: Math.max(0, maxRows - formData3.length) }, () => ({
            specialSkills: "",
            nonAcademicDistinctions: "",
            membershipInAssociation: ""
        })),
      ];

    return(
        <div
        style={{
            border: "1px solid black",
            padding: "0.25in",
            width: "8in",
            marginBottom: "7%",
            height: "fit-content"
        }}
        >
        <table
            style={{
            border: "1px solid black",
            borderCollapse: "collapse",
            fontFamily: "Arial, Helvetica, sans-serif",
            width: "8in",
            tableLayout: "fixed"
            }}
        >
            <tbody>
            <tr>
                <td
                colSpan={15}
                style={{
                    height: "0.2in",
                    fontSize: "72.5%",
                    backgroundColor: "gray",
                    color: "white"
                }}
                >
                <b>
                    <i>
                    VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT /
                    PEOPLE / VOLUNTARY ORGANIZATION/S
                    </i>
                </b>
                </td>
            </tr>
            <tr>
                <td
                colSpan={1}
                rowSpan={2}
                style={{
                    height: "0.3in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px 1px 1px 0px solid black"
                }}
                >
                29.
                </td>
                <td
                colSpan={6}
                rowSpan={2}
                style={{
                    height: "0.3in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px 0px 1px 1px solid black",
                    textAlign: "center"
                }}
                >
                NAME &amp; ADDRESS OF ORGANIZATION
                <br />
                (Write in full)
                </td>
                <td
                colSpan={2}
                style={{
                    height: "0.2in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                INCLUSIVE DATES
                <br />
                (mm/dd/yyyy)
                </td>
                <td
                colSpan={1}
                rowSpan={2}
                style={{
                    height: "0.3in",
                    fontSize: "50%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                NUMBER OF
                <br />
                HOURS
                </td>
                <td
                colSpan={5}
                rowSpan={2}
                style={{
                    height: "0.3in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                POSITION / NATURE OF WORK
                </td>
            </tr>
            <tr>
                <td
                colSpan={1}
                style={{
                    height: "0.1in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                From
                </td>
                <td
                colSpan={1}
                style={{
                    height: "0.1in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                To
                </td>
            </tr>
            
            {paddedData.map((item, index) => (
            <tr key={item.person_id || index}>
                <td
                colSpan={7}
                style={{
                    height: "0.3in",
                    fontSize: "62.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" value={item.nameAndAddress} style={{width: '98%', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
                <td
                colSpan={1}
                style={{
                    height: "0.3in",
                    fontSize: "52.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" value={item.dateFrom} style={{width: '98%', fontSize:'0.5rem', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
                <td
                colSpan={1}
                style={{
                    height: "0.3in",
                    fontSize: "52.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" value={item.dateTo} style={{width: '98%', fontSize: '0.5rem', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
                <td
                colSpan={1}
                style={{
                    height: "0.3in",
                    fontSize: "52.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" value={item.numberOfHours} style={{width: '98%', textAlign: 'center', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
                <td
                colSpan={5}
                style={{
                    height: "0.3in",
                    fontSize: "62.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" value={item.natureOfWork} style={{width: '98%', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
            </tr>
            ))}
        
            <tr>
                <td
                colSpan={15}
                style={{
                    height: "0.1in",
                    fontSize: "55%",
                    backgroundColor: "lightgray",
                    color: "red",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                <b>
                    <i>(Continue on separate sheet if necessary)</i>
                </b>
                </td>
            </tr>
            <tr>
                <td
                colSpan={15}
                style={{
                    height: "0.2in",
                    fontSize: "72.5%",
                    backgroundColor: "gray",
                    color: "white"
                }}
                >
                <b>
                    <i>
                    VII. LEARNING AND DEVELOPMENT (L&amp;D) INTERVENTIONS/TRAINING
                    PROGRAMS ATTENDED
                    </i>
                </b>
                </td>
            </tr>
            <tr>
                <td
                colSpan={1}
                rowSpan={2}
                style={{
                    height: "0.5in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px 1px 1px 0px solid black"
                }}
                >
                30.
                </td>
                <td
                colSpan={6}
                rowSpan={2}
                style={{
                    height: "0.5in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px 0px 1px 1px solid black",
                    textAlign: "center"
                }}
                >
                TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING PROGRAMS
                <br />
                (Write in full)
                </td>
                <td
                colSpan={2}
                style={{
                    height: "0.4in",
                    fontSize: "55%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                INCLUSIVE DATES OF
                <br />
                ATTENDANCE
                <br />
                (mm/dd/yyyy)
                </td>
                <td
                colSpan={1}
                rowSpan={2}
                style={{
                    height: "0.5in",
                    fontSize: "55%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                NUMBER OF
                <br />
                HOURS
                </td>
                <td
                colSpan={1}
                rowSpan={2}
                style={{
                    height: "0.5in",
                    fontSize: "50%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                Type of LD
                <br />
                ( Managerial/ Supervisory/
                <br />
                Technical/etc)
                </td>
                <td
                colSpan={4}
                rowSpan={2}
                style={{
                    height: "0.5in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                CONDUCTED/ SPONSORED BY
                <br />
                (Write in full)
                </td>
            </tr>
            <tr>
                <td
                colSpan={1}
                style={{
                    height: "0.1in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                From
                </td>
                <td
                colSpan={1}
                style={{
                    height: "0.1in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                To
                </td>
            </tr>

            {paddedDataTable2.map((item, index) => (
            <tr key={item.person_id || index}>
                <td
                colSpan={7}
                style={{
                    height: "0.25in",
                    fontSize: "62.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" value={item.titleOfProgram} style={{width: '98%', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
                <td
                colSpan={1}
                style={{
                    height: "0.25in",
                    fontSize: "52.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" value={item.dateFrom} style={{width: '98%', fontSize: '0.5rem', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
                <td
                colSpan={1}
                style={{
                    height: "0.25in",
                    fontSize: "52.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text"value={item.dateTo} style={{width: '98%', fontSize: '0.5rem', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
                <td
                colSpan={1}
                style={{
                    height: "0.25in",
                    fontSize: "52.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" value={item.numberOfHours} style={{width: '98%', textAlign: 'center', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
                <td
                colSpan={1}
                style={{
                    height: "0.25in",
                    fontSize: "52.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" value={item.typeOfLearningDevelopment} style={{width: '98%', fontSize: '0.55rem', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
                <td
                colSpan={4}
                style={{
                    height: "0.25in",
                    fontSize: "62.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" value={item.conductedSponsored} style={{width: '98%', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
            </tr>
            ))}

            <tr>
                <td
                colSpan={15}
                style={{
                    height: "0.1in",
                    fontSize: "55%",
                    backgroundColor: "lightgray",
                    color: "red",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                <b>
                    <i>(Continue on separate sheet if necessary)</i>
                </b>
                </td>
            </tr>
            <tr>
                <td
                colSpan={15}
                style={{
                    height: "0.3in",
                    fontSize: "72.5%",
                    backgroundColor: "gray",
                    color: "white"
                }}
                >
                <b>
                    <i>VIII. OTHER INFORMATION</i>
                </b>
                </td>
            </tr>
            <tr>
                <td
                colSpan={1}
                style={{
                    height: "0.3in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px 1px 1px 0px solid black"
                }}
                >
                31.
                </td>
                <td
                colSpan={3}
                style={{
                    height: "0.3in",
                    fontSize: "55%",
                    backgroundColor: "lightgray",
                    border: "1px 0px 1px 1px solid black",
                    textAlign: "center"
                }}
                >
                SPECIAL SKILLS and HOBBIES
                </td>
                <td
                colSpan={1}
                style={{
                    height: "0.3in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px solid black"
                }}
                >
                32.
                </td>
                <td
                colSpan={6}
                style={{
                    height: "0.3in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                NON-ACADEMIC DISTINCTIONS / RECOGNITION
                <br />
                (Write in full)
                </td>
                <td
                colSpan={1}
                style={{
                    height: "0.3in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px 1px 1px 0px solid black"
                }}
                >
                33.
                </td>
                <td
                colSpan={3}
                style={{
                    height: "0.3in",
                    fontSize: "55%",
                    backgroundColor: "lightgray",
                    border: "1px 0px 1px 1px solid black",
                    textAlign: "center"
                }}
                >
                MEMBERSHIP IN ASSOCIATION/ORGANIZATION
                <br />
                (Write in full)
                </td>
            </tr>

            {paddedDataTable3.map((item, index) => (
            <tr key={item.person_id || index}>
                <td
                colSpan={4}
                style={{
                    height: "0.3in",
                    fontSize: "62.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" value={item.specialSkills} style={{width: '98%', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
                <td
                colSpan={7}
                style={{
                    height: "0.3in",
                    fontSize: "62.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" value={item.nonAcademicDistinctions} style={{width: '98%', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
                <td
                colSpan={4}
                style={{
                    height: "0.3in",
                    fontSize: "62.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" value={item.membershipInAssociation} style={{width: '98%', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
            </tr>
            ))}

            <tr>
                <td
                colSpan={15}
                style={{
                    height: "0.1in",
                    fontSize: "55%",
                    backgroundColor: "lightgray",
                    color: "red",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                <b>
                    <i>(Continue on separate sheet if necessary)</i>
                </b>
                </td>
            </tr>
            <tr>
                <td
                colSpan={4}
                style={{
                    height: "0.25in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                <b>
                    <i>
                    SIGNATURE
                    <i />
                    </i>
                </b>
                <i>
                    <i></i>
                </i>
                </td>
                <td
                colSpan={5}
                style={{
                    height: "0.25in",
                    fontSize: "62.5%",
                    border: "1px solid black"
                }}
                >
                <input type="file" style={{width: '98%', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
                <td
                colSpan={2}
                style={{
                    height: "0.25in",
                    fontSize: "62.5%",
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                    textAlign: "center"
                }}
                >
                <b>
                    <i>
                    DATE
                    <i />
                    </i>
                </b>
                <i>
                    <i></i>
                </i>
                </td>
                <td
                colSpan={4}
                style={{
                    height: "0.25in",
                    fontSize: "62.5%",
                    border: "1px solid black"
                }}
                >
                <input type="text" style={{width: '98%', border: 'none', outline: 'none', background: 'none'}}/>
                </td>
            </tr>
            <tr>
                <td
                colSpan={15}
                style={{
                    height: "0.1in",
                    fontSize: "50%",
                    border: "1px solid white",
                    textAlign: "right"
                }}
                >
                <i>CS FORM 212 (Revised 2017), Page 3 of 4</i>
                </td>
            </tr>
            </tbody>
        </table>
        </div>

    )
}

export default PDS3;