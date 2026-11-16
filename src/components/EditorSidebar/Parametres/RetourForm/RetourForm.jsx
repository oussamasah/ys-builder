// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
// import { useSelector } from "react-redux";
// import repondre from "../../../../assets/imgformRepondre/repondre.png";
// import "./RetourForm.css";
// import toast, { Toaster } from "react-hot-toast";
// import { Modal } from "react-bootstrap";
// import { format } from "date-fns";
// import { useParams } from "react-router-dom";
// export default function RetourForm(props) {
//   let { siteId } = useParams();
//   const [Retour, setRetour] = useState(false);
//   const [Repond, setRepond] = useState(false);
//   const handleRetourShow = () => setRetour(true);
//   const handleCloseRetour = () => {
//     setRetour(false);
//     setRepond(false);
//   };
//   const handleRepondre = () => {
//     setRepond(!Repond);
//   };
//   const [GetRetour, setGetretour] = useState([]);
//   const [retourdSingleRes, setretourdSingleRes] = useState(false);

//   const handleSingleRetour = (node) => {
//     setRetour(true);
//     setretourdSingleRes(node);
//   };

//   const getRetour = async () => {
//     await axios
//       .get(process.env.REACT_APP_API_URL + "/messages/get/" + siteId)
//       .then((response) => {
//         setGetretour(response.data.data);
//         // setGetretourMessage(response.data.data[0].value);
//       });
//   };
//   useEffect(() => {
//     getRetour();
//   }, []);
//   const x = new Date(retourdSingleRes.date_creation);
//   return (
//     <div id="RetourForm">
//       <div className="titleDesign">
//         <span> RÉPONSES AUX FORMULAIRES </span>
//         <span className="mt-4"> Total message : {GetRetour.length}</span>
//       </div>
//       <div id="table-wrapper">
//         <div id="table-scroll">
//           {GetRetour != "" ? (
//             <table class="table table table-sm  backs table-container ">
//               <thead>
//                 <tr>
//                   <th>Nom </th>
//                   <th>Date </th>
//                   <th>Email </th>
//                   <th>Message </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {GetRetour.map((back) => {
//                   return (
//                     <tr>
//                       <td>
//                         {" "}
//                         <span
//                           data-toggle="tooltip"
//                           data-placement="top"
//                           title={back.title}
//                         >
//                           {back.title}{" "}
//                         </span>
//                       </td>
//                       <td>
//                         <span>
//                           {format(
//                             new Date(back.date_creation),
//                             "yyyy-MM-dd : kk:mm:ss"
//                           )}
//                         </span>
//                       </td>

//                       <td >
//                         <div>
//                           {back.data.map((det) => {
//                             return (
//                               <div>
//                                 {det.name == "Email" ? (
//                                   <span>{det.value}</span>
//                                 ):
//                                  (
//                                     <span ></span>
//                                 )}
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </td>
//                       <td>
//                         <div className="d-flex justify-content-between"></div>

//                         <button
//                           className="btn  btn-rounded btn btn-outline-secondary  voir "
//                           onClick={(e) => [
//                             handleRetourShow(back),
//                             handleSingleRetour(back),
//                           ]}
//                         >
//                           <i
//                             class="fa-light fa-eye"
//                             data-toggle="tooltip"
//                             data-placement="top"
//                             title="Voir"
//                           ></i>
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           ) : (
//             <span>Pas de retour</span>
//           )}
//         </div>
//       </div>
//       <Modal
//         show={Retour}
//         onHide={handleCloseRetour}
//         backdrop="static"
//         keyboard={false}
//         size="lg"
//         className="modalRestauration"
//         id="addPageModal"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header className="add_page_modal_header">
//           <div className="titre_popup_page">
//             <div className="modal_header_add_page ">
//               <div className="titre_popup_add_page">MESSAGE | CONTACT</div>

//               <i
//                 className="fa-solid fa-xmark closeSideBar"
//                 onClick={handleCloseRetour}
//               ></i>
//             </div>
//           </div>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="add_page_modal_content d-flex justify-content-center  bg-white">
//             <div className="addPageOptions">
//               <div>
//               <span class="test-aide  mb-3"><b>NB :</b> S'il ya un message, il est la main pour répondre il suffit de cliquer sur envelove.</span>
              
//                 <span className="d-block mb-2">
//                   <b>Nom :</b> {retourdSingleRes.title}
//                 </span>
//                 <span className="d-block mb-2">
//                   <b>Date d'envoi :</b> {x.toLocaleDateString("fr").replaceAll('/','-')}
//                 </span>
//                 <div className="d-block mb-2">
               
//                   {retourdSingleRes.data?.map((d) => {
//                     return (
//                       <div>
                        
//                         {d.name == "message" || d.name == "Message" ? (
//                           <>
//                            <b>Message :</b>
//                            <div className="d-flex justify-content-center align-items-center">
//                             <span class="form-control mt-3">     {d.value}</span>
//                             <button
//                               className=" mt-3 repondre"
//                               onClick={handleRepondre}
//                             >
//                               <img src={repondre} alt="repondre" />
//                             </button>
//                             </div>
//                             {Repond && (
//                               <textarea
//                                 class="form-control mt-3"
//                                 name="message"
//                               >
//                                 {d.value}
//                               </textarea>
//                             )}
//                           </>
//                         ) 
//                         : ('')}
//                       </div>
//                     );
//                   })}
//                   {/* <textarea class="form-control mt-3"  name="message" >{d.value}</textarea> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           {Repond == true ? (
//             <button
//               className="btn btn-rounded  btn-outline-secondary"
//               onClick={(e) => handleCloseRetour(false)}
//             >
//               Repondre
//             </button>
//           ) : (
//             <button
//               className="btn btn-rounded  btn-outline-secondary"
//               disabled
//               onClick={(e) => handleCloseRetour(false)}
//             >
//               Repondre
//             </button>
//           )}
//           <button
//             className="btn btn-rounded  btn-outline-secondary"
//             onClick={(e) => handleCloseRetour(false)}
//           >
//             Fermer
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
