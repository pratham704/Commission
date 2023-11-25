import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS file
import html2pdf from "html2pdf.js";

import { createClient } from "@supabase/supabase-js";
import { isIOS } from "react-device-detect";
import Pdf from "./Pdf";






export default function File() {

  

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.match(/iPhone|iPad|iPod/i)) {
      console.log("This is an iOS device.");
    } else if (userAgent.match(/Android/i)) {
      console.log("This is an Android device.");
    } else {
      console.log("This is neither an iOS nor an Android device.");
    }
  }, []);

  const supabase = createClient(
    "https://auttbujxqybremaoyympt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5mcCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1dHRidWp4cXlicmVhb3l5bXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1ODU1MjAsImV4cCI6MjAxNjE2MTUyMH0.NIYMnCVsBNdNV4c3CPWp9HFcooh9O4-dYARomO2xFGU"
  );

  const [images, setImages] = useState(Array(7).fill(null));
  const [brakesimages, setbrakesImages] = useState(Array(2).fill(null));

  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    customerAddress: "",
    addressStatePin: "",
    contactPerson: "",
    designation: "",
    contactNumber: "",
    visitDate: "",
  });
  

  const handleFileChange = (e, index) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileChange2 = (e, index) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const newImages = [...brakesimages];
        newImages[index] = reader.result;
        // setImages(newImages);

        setbrakesImages(newImages);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleInputChange = (field, value) => {
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };



  const handlePrint = () => {
    const element = document.getElementById("print-container");
    html2pdf()
      .from(element)
      .set({
        pagebreak: { mode: "avoid-all", before: "", after: ["#abc2", "#abc"] },
        // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      })
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        const pdfBlob = new Blob([pdf.output("blob")], {
          type: "application/pdf",
        });
        const currentDate = new Date();
        const formattedDate = `${
          customerInfo.customerName
        }-${currentDate.getDate()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getFullYear()}-${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;
        const fileName = formattedDate;

        // const downloadLink = document.createElement("a");
        // downloadLink.href = URL.createObjectURL(pdfBlob);
        // downloadLink.download = fileName;
        // downloadLink.click();
     
      });
  };

  const photoOptions = [
    "Generator Front Side Photo",
    "Generator Right Side Photo",
    "Generator Left Side Photo",
    "Generator Back Side Photo",
    "Generator with Customer Building Photo",
    "Generator with Exhaust Piping Photo",
    "Generator Set Name Plate",
    "Engine Name Plate",
    "Alternator Name Plate",
    "Controller Name Plate",
  ];

  const photoOptionsBrakes = [
    "Breaker Front side photo",
    "Breaker Name Plate Photo",
  ];

  const [breaker, setBreaker] = useState(null);

  const handleBreakerChange = (e) => {
    const selectedValue = e.target.value;
    setBreaker(selectedValue);
    if (selectedValue === "Yes") {
      console.log("Breaker: Yes");
    }
  };


  const [ispreview, setispreview] = useState(false)

  const [selectedModel, setSelectedModel] = useState("");

  const [selectedEngineer, setSelectedEngineer] = useState("");

  const [selectedApplication, setSelectedApplication] = useState("");

  const [selectedApplicationType, setSelectedApplicationType] = useState("");
  const [selectedLoadType, setSelectedLoadType] = useState("");
  const [selectedEnvironmentType, setSelectedEnvironmentType] = useState("");

  return (
    <>



    {ispreview?<Pdf      customerInfo={customerInfo}
    images={images}
    selectedModel={selectedModel}
    selectedEngineer={selectedEngineer}
    selectedApplication={selectedApplication}
    selectedApplicationType={selectedApplicationType}
    selectedLoadType={selectedLoadType}
    selectedEnvironmentType={selectedEnvironmentType}  />:
    
    <div className="print-container" id="print-container">
    <div className="dropdown-container">
      <label htmlFor="modelDropdown" className="model-label">
        Choose Model:
      </label>
      <select
        id="modelDropdown"
        className="model-dropdown"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        <option> Select</option>
        <option value="M450">M450</option>
        <option value="FM500">FM500</option>
        <option value="FM600">FM600</option>
        <option value="FM650">FM650</option>
        <option value="FM910">FM910</option>
        <option value="FM1010">FM1010</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div className="dropdown-container">
      <label htmlFor="modelDropdown" className="model-label">
        Engineers name :
      </label>
      <select
        className="model-dropdown"
        value={selectedEngineer}
        onChange={(e) => setSelectedEngineer(e.target.value)}
      >
        <option> Select</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
    </div>

    <div className="customer-info-container">
      <label htmlFor="customerName" className="model-label">
        Customer Name:
      </label>
      <input
        type="text"
        id="customerName"
        className="customer-info-input"
        value={customerInfo.customerName}
        onChange={(e) => handleInputChange("customerName", e.target.value)}
        required
      />

      <label htmlFor="customerAddress" className="model-label">
        Customer Address:
      </label>
      <input
        type="text"
        id="customerAddress"
        className="customer-info-input"
        value={customerInfo.customerAddress}
        onChange={(e) =>
          handleInputChange("customerAddress", e.target.value)
        }
        required
      />

      <label htmlFor="addressStatePin" className="model-label">
        Address - state & pin code :
      </label>
      <input
        type="text"
        id="addressStatePin"
        className="customer-info-input"
        value={customerInfo.addressStatePin}
        onChange={(e) =>
          handleInputChange("addressStatePin", e.target.value)
        }
        required
      />

      <label htmlFor="contactPerson" className="model-label">
        Customer contact person :
      </label>
      <input
        type="text"
        id="contactPerson"
        className="customer-info-input"
        value={customerInfo.contactPerson}
        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
        required
      />

      <label htmlFor="designation" className="model-label">
        Designation :
      </label>
      <input
        type="text"
        id="designation"
        className="customer-info-input"
        value={customerInfo.designation}
        onChange={(e) => handleInputChange("designation", e.target.value)}
        required
      />

      <label htmlFor="contactNumber" className="model-label">
        Contact Number :
      </label>
      <input
        type="text"
        id="contactNumber"
        className="customer-info-input"
        value={customerInfo.contactNumber}
        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
        required
      />

      <label htmlFor="visitDate" className="model-label">
        Commissioning Visit Date :
      </label>
      <input
        type="date"
        id="visitDate"
        className="customer-info-input"
        value={customerInfo.visitDate}
        onChange={(e) => handleInputChange("visitDate", e.target.value)}
        required
      />
    </div>

    <div className="dropdown-container">
      <label htmlFor="applicationDropdown" className="model-label">
        DG Applications:
      </label>
      <select
        id="applicationDropdown"
        className="model-dropdown"
        value={selectedApplication}
        onChange={(e) => setSelectedApplication(e.target.value)}
      >
        <option> Select</option>

        <option value="Hospital">Hospital</option>
        <option value="Industry">Industry</option>
        <option value="Hotel">Hotel</option>
        <option value="CommercialComplex">Commercial Complex</option>
        <option value="OilGas">Oil & Gas</option>
        <option value="CrusherPlant">Crusher Plant</option>
        <option value="Residential">Residential</option>
      </select>
    </div>

    <div className="input-container">
      {images.map((image, index) => (
        <>
          <div key={index} className="input-item">
            <label htmlFor={`fileInput${index}`} className="file-label">
              <input
                type="file"
                id={`fileInput${index}`}
                onChange={(e) => handleFileChange(e, index)}
                accept="image/*"
                capture="user"
              />
              Upload {photoOptions[index]}
              {image && (
                <div className="image-preview">
                  <img
                    src={image}
                    alt=""
                    style={{
                      width: isIOS ? "75px" : "300px",
                      height: isIOS ? "75px" : "300px",
                    }}
                  />
                </div>
              )}
            </label>
          </div>
        </>
      ))}
    </div>

    <div className="dropdown-container">
      <label htmlFor="breakerDropdown" className="model-label">
        Breaker:
      </label>
      <select
        id="breakerDropdown"
        value={breaker}
        onChange={handleBreakerChange}
        className="model-dropdown"
      >
        <option> Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>

    {breaker === "Yes" ? (
      <>
        <div className="input-container">
          {brakesimages.map((image, index) => (
            <div key={index} className="input-item">
              <label htmlFor={`fileInput${index}`} className="file-label">
                <input
                  type="file"
                  id={`fileInput${index}`}
                  onChange={(e) => handleFileChange2(e, index)}
                  accept="image/*"
                  capture="user"
                />
                <span className="file-input-text">
                  {photoOptionsBrakes[index]}
                </span>
                {image && (
                  <div className="image-preview">
                    <img
                      src={image}
                      alt=""
                      style={{ width: "300px", height: "300px" }}
                    />
                  </div>
                )}
              </label>
            </div>
          ))}
        </div>
      </>
    ) : null}

    <div className="dropdown-container">
      <label htmlFor="applicationTypeDropdown" className="model-label">
        DG Application type:
      </label>
      <select
        id="applicationTypeDropdown"
        className="model-dropdown"
        value={selectedApplicationType}
        onChange={(e) => setSelectedApplicationType(e.target.value)}
      >
        <option> Select</option>
        <option value="Continuous">Continuous</option>
        <option value="Prime">Prime</option>
        <option value="Standby">Standby</option>
      </select>
    </div>

    <div className="dropdown-container">
      <label htmlFor="loadTypeDropdown" className="model-label">
        Load type:
      </label>
      <select
        id="loadTypeDropdown"
        className="model-dropdown"
        value={selectedLoadType}
        onChange={(e) => setSelectedLoadType(e.target.value)}
      >
        <option> Select</option>
        <option value="Continuous">Connected</option>
        <option value="Prime">Loaded bank</option>
        <option value="Standby">None</option>
      </select>
    </div>

    <div className="dropdown-container">
      <label htmlFor="environmentTypeDropdown" className="model-label">
        DG Environment / Surrounding Type:
      </label>
      <select
        id="environmentTypeDropdown"
        className="model-dropdown"
        value={selectedEnvironmentType}
        onChange={(e) => setSelectedEnvironmentType(e.target.value)}
      >
        <option> Select</option>
        <option value="Dusty">Dusty</option>
        <option value="Chemical">Chemical</option>
        <option value="Saline">Saline</option>
        <option value="Coastal">Coastal</option>
        <option value="Clean">Clean</option>
      </select>
    </div>
  </div>
  
  
  
  }













     
      <button className="confirmandnextbtn"  onClick={()=>setispreview(!ispreview)}>Preview</button>
    </>
  );
}
