import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/css/components.css";
import { jwtDecode } from 'jwt-decode';
const PDS2 = () => {
  const [formData, setData] = useState([]);
  const [formData2, setData2] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [eligibilityResponse, workExperienceResponse] = await Promise.all([
          axios.get("http://localhost:5000/eligibilityRoute/eligibility"),
          axios.get("http://localhost:5000/workExperienceRoute/work_experience_table"),
        ]);
        setData(eligibilityResponse.data);
        setData2(workExperienceResponse.data);
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

  const maxRows = 7; // Define the maximum number of rows
  const maxRowsTable2 = 27;
  // Pad `data` with placeholders if it has fewer than `maxRows` rows
  const paddedData = [
    ...filteredFormData,
    ...Array.from({ length: Math.max(0, maxRows - formData.length) }, () => ({
      eligibilityName: "",
      eligibilityRating: "",
      eligibilityDateOfExam: "",
      eligibilityPlaceOfExam: "",
      licenseNumber: "",
      DateOfValidity: "",
    })),
  ];

  const paddedDataTable2 = [
    ...filteredFormData2 ,
    ...Array.from({ length: Math.max(0, maxRowsTable2 - formData2.length) }, () => ({
      workDateFrom: "",
      workDateTo: "",
      workPositionTitle: "",
      workCompany: "",
      workMonthlySalary: "",
      SalaryJobOrPayGrade: "",
      StatusOfAppointment: "",
      isGovtService: "",
    })),
  ];


  return (
    <div
      style={{
        border: "1px solid black",
        padding: "0.25in",
        width: "8in",
        marginBottom: "7%",
        height: "fit-content",
      }}
    >
    
      <table
        style={{
          border: "1px solid black",
          borderCollapse: "collapse",
          fontFamily: "Arial, Helvetica, sans-serif",
          width: "8in",
          tableLayout: "fixed",
        }}
      >
        
        <tbody>
          <tr>
            <td
              colSpan={18}
              style={{
                height: "0.2in",
                fontSize: "72.5%",
                backgroundColor: "gray",
                color: "white",
              }}
            >
              <b>
                <i>IV. CIVIL SERVICE ELIGIBILITY</i>
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
                border: "1px 1px 1px 0px solid black",
              }}
            >
              27.
            </td>
            <td
              colSpan={5}
              rowSpan={2}
              style={{
                height: "0.3in",
                fontSize: "52.5%",
                backgroundColor: "lightgray",
                border: "1px 0px 1px 1px solid black",
                textAlign: "center",
              }}
            >
              CAREER SERVICE/ RA 1080 (BOARD/ BAR) UNDER
              <br />
              SPECIAL LAWS/ CES/ CSEE
              <br />
              BARANGAY ELIGIBILITY / DRIVER'S LICENSE
            </td>
            <td
              colSpan={2}
              rowSpan={2}
              style={{
                height: "0.3in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              RATING
              <br />
              (If Applicable)
            </td>
            <td
              colSpan={2}
              rowSpan={2}
              style={{
                height: "0.3in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              DATE OF
              <br />
              EXAMINATION /<br />
              CONFERMENT
            </td>
            <td
              colSpan={5}
              rowSpan={2}
              style={{
                height: "0.3in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              PLACE OF EXAMINATION / CONFERMENT
            </td>
            <td
              colSpan={3}
              style={{
                height: "0.1in",
                fontSize: "55%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              LICENSE (if applicable)
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                height: "0.2in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              NUMBER
            </td>
            <td
              colSpan={1}
              style={{
                height: "0.2in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              Date of
              <br />
              Validity
            </td>
          </tr>

          {paddedData.map((item, index) => (
            <tr key={item.person_id || index}>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.eligibilityName}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "52.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.eligibilityRating}
                  style={{
                    width: "98%",
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "52.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.eligibilityDateOfExam}
                  style={{
                    width: "98%",
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={5}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.eligibilityPlaceOfExam}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "52.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.licenseNumber}
                  style={{
                    width: "98%",
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "52.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.DateOfValidity}
                  style={{
                    width: "98%",
                    textAlign: "center",
                    fontSize: "0.45rem",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td
              colSpan={18}
              style={{
                height: "0.1in",
                fontSize: "55%",
                backgroundColor: "lightgray",
                color: "red",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              <b>
                <i>(Continue on separate sheet if necessary)</i>
              </b>
            </td>
          </tr>
          <tr>
            <td
              colSpan={18}
              style={{
                height: "0.55in",
                fontSize: "70%",
                backgroundColor: "gray",
                color: "white",
              }}
            >
              <b>
                <i>
                  V. WORK EXPERIENCE
                  <br />
                  (Include private employment. Start from your recent work)
                  Description of duties should be indicated in the attached Work
                  Experience sheet.
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
                border: "1px 1px 1px 0px solid black",
              }}
            >
              28.
            </td>
            <td
              colSpan={3}
              rowSpan={2}
              style={{
                height: "0.3in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px 0px 1px 1px solid black",
                textAlign: "center",
              }}
            >
              INCLUSIVE DATES
              <br />
              (mm/dd/yyyy)
            </td>
            <td
              colSpan={4}
              rowSpan={3}
              style={{
                height: "0.3in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              POSITION TITLE
              <br />
              (Write in full/Do not abbreviate)
            </td>
            <td
              colSpan={4}
              rowSpan={3}
              style={{
                height: "0.3in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              DEPARTMENT / AGENCY / OFFICE / COMPANY <br />
              (Write in full/Do not abbreviate)
            </td>
            <td
              colSpan={1}
              rowSpan={3}
              style={{
                height: "0.3in",
                fontSize: "52.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              MONTHLY
              <br />
              SALARY
            </td>
            <td
              colSpan={2}
              rowSpan={3}
              style={{
                height: "0.3in",
                fontSize: "50%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              SALARY/ JOB/
              <br />
              PAY GRADE (if
              <br />
              applicable)&amp;
              <br />
              STEP (Format
              <br />
              "00-0")/
              <br />
              INCREMENT
            </td>
            <td
              colSpan={2}
              rowSpan={3}
              style={{
                height: "0.3in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              STATUS OF
              <br />
              APPOINTMENT
            </td>
            <td
              colSpan={1}
              rowSpan={3}
              style={{
                height: "0.3in",
                fontSize: "55%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              GOV'T
              <br />
              SERVICE
              <br />
              (Y/N)
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td
              colSpan={2}
              style={{
                height: "0.3in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              From
            </td>
            <td
              colSpan={2}
              style={{
                height: "0.3in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              To
            </td>
          </tr>

          {paddedDataTable2.map((item, index) => (
            <tr key={item.person_id || index}>
              <td
              colSpan={2}
              style={{
                height: "0.3in",
                fontSize: "62.5%",
                border: "1px solid black",
              }}
            >
              <input
                type="text"
                value={item.workDateFrom}
                style={{
                  width: "98%",
                  border: "none",
                  outline: "none",
                  background: "none",
                }}
              />
            </td>
            <td
              colSpan={2}
              style={{
                height: "0.3in",
                fontSize: "52.5%",
                border: "1px solid black",
              }}
            >
              <input
                type="text"
                value={item.workDateTo}
                style={{
                  width: "98%",
                  border: "none",
                  outline: "none",
                  background: "none",
                }}
              />
            </td>
            <td
              colSpan={4}
              style={{
                height: "0.3in",
                fontSize: "52.5%",
                border: "1px solid black",
              }}
            >
              <input
                type="text"
                value={item.workPositionTitle}
                style={{
                  width: "98%",
                  border: "none",
                  outline: "none",
                  background: "none",
                }}
              />
            </td>
            <td
              colSpan={4}
              style={{
                height: "0.3in",
                fontSize: "62.5%",
                border: "1px solid black",
              }}
            >
              <input
                type="text"
                value={item.workCompany}
                style={{
                  width: "98%",
                  border: "none",
                  outline: "none",
                  background: "none",
                }}
              />
            </td>
            <td
              colSpan={1}
              style={{
                height: "0.3in",
                fontSize: "52.5%",
                border: "1px solid black",
              }}
            >
              <input
                type="text"
                value={item.workMonthlySalary}
                style={{
                  width: "98%",
                  border: "none",
                  outline: "none",
                  fontSize: "0.7rem",
                  background: "none",
                }}
              />
            </td>
            <td
              colSpan={2}
              style={{
                height: "0.3in",
                fontSize: "52.5%",
                border: "1px solid black",
              }}
            >
              <input
                type="text"
                value={item.SalaryJobOrPayGrade}
                style={{
                  width: "98%",
                  border: "none",
                  outline: "none",
                  background: "none",
                }}
              />
            </td>
            <td
              colSpan={2}
              style={{
                height: "0.3in",
                fontSize: "52.5%",
                border: "1px solid black",
              }}
            >
              <input
                type="text"
                value={item.StatusOfAppointment}
                style={{
                  textAlign: "center",
                  width: "98%",
                  border: "none",
                  outline: "none",
                  background: "none",
                }}
              />
            </td>
            <td
              colSpan={1}
              style={{
                height: "0.3in",
                fontSize: "52.5%",
                border: "1px solid black",
              }}
            >
              <input
                type="text"
                value={item.isGovtService}
                style={{
                  textAlign: "center",
                  width: "98%",
                  border: "none",
                  outline: "none",
                  background: "none",
                }}
              />
            </td>
            </tr>
          ))}

          <tr>
            <td
              colSpan={18}
              style={{
                height: "0.1in",
                fontSize: "55%",
                backgroundColor: "lightgray",
                color: "red",
                border: "1px solid black",
                textAlign: "center",
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
                textAlign: "center",
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
              colSpan={7}
              style={{
                height: "0.25in",
                fontSize: "62.5%",
                border: "1px solid black",
              }}
            >
              <input
                type="file"
                style={{
                  width: "98%",
                  border: "none",
                  outline: "none",
                  background: "none",
                }}
              />
            </td>
            <td
              colSpan={3}
              style={{
                height: "0.25in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
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
                border: "1px solid black",
              }}
            >
              <input
                type="text"
                style={{
                  width: "98%",
                  border: "none",
                  outline: "none",
                  background: "none",
                }}
              />
            </td>
          </tr>
          <tr>
            <td
              colSpan={18}
              style={{
                height: "0.1in",
                fontSize: "50%",
                border: "1px solid white",
                textAlign: "right",
              }}
            >
              <i>CS FORM 212 (Revised 2017), Page 2 of 4</i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PDS2;
