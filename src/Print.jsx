import { useRef } from 'react';
import generatePDF from 'react-to-pdf';

export default function Print(){
   const targetRef = useRef();
   return (
      <div>
         <button onClick={() => generatePDF(targetRef, {filename: 'page.pdf'})}>Download PDF</button>
         <div ref={targetRef}>
            Content to be included in the PDF
         </div>
      </div>
   )
}