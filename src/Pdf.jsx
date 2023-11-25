import React from "react";
import { useEffect } from "react";

export default function Pdf({
  customerInfo,
  images,
  selectedModel,
  selectedEngineer,
  selectedApplication,
  selectedApplicationType,
  selectedLoadType,
  selectedEnvironmentType,
}) {
  return (
    <>
      <ol>
        <li>Customer Name: {customerInfo.customerName}</li>
        <li>Customer Address: {customerInfo.customerAddress}</li>
        <li>Address - State & Pin Code: {customerInfo.addressStatePin}</li>
        <li>Contact Person: {customerInfo.contactPerson}</li>
        <li>Designation: {customerInfo.designation}</li>
        <li>Contact Number: {customerInfo.contactNumber}</li>
        <li>Commissioning Visit Date: {customerInfo.visitDate}</li>

        <li>Selected Model: {selectedModel}</li>
        <li>Selected Engineer: {selectedEngineer}</li>
        <li>Selected Application: {selectedApplication}</li>
        <li>Selected Application Type: {selectedApplicationType}</li>
        <li>Selected Load Type: {selectedLoadType}</li>
        <li>Selected Environment Type: {selectedEnvironmentType}</li>
      </ol>
      {images && (
        <>
          "Generator Front Side Photo",
          <br />
          <img
            src={images[0]}
            alt={"enjoy"}
            style={{ width: "200px", height: "200px" }}
          />
          <br />
          "Generator Right Side Photo",
          <br />
          <img
            src={images[1]}
            alt={"enjoy"}
            style={{ width: "200px", height: "200px" }}
          />
          <br />
          "Generator Left Side Photo",
          <br />

          <img
            src={images[2]}
            alt={"enjoy"}
            style={{ width: "200px", height: "200px" }}
          />
          <br />
          "Generator Back Side Photo",
          <br />

          <img
            src={images[3]}
            alt={"enjoy"}
            style={{ width: "200px", height: "200px" }}
          />
          <br />
          "Generator with Customer Building Photo",
          <br />

          <img
            src={images[4]}
            alt={"enjoy"}
            style={{ width: "200px", height: "200px" }}
          />
          <br />
          "Generator with Exhaust Piping Photo",
          <br />

          <img
            src={images[5]}
            alt={"enjoy"}
            style={{ width: "200px", height: "200px" }}
          />
          <br />
          "Generator Set Name Plate",
          <br />

          <img
            src={images[6]}
            alt={"enjoy"}
            style={{ width: "200px", height: "200px" }}
          />
        </>
      )}




     {/* if u r compy using map then follow below  one  */}


      {/* {images && images.map((image, index) => (<>
    <img
          key={index}
          src={image}
          alt={`Preview ${index}`}
          style={{ width: "200px", height: "200px" }} 
        />
        <br />
        </>
      ))} */}
    </>
  );
}
