import axios from "axios";
import { fromBlob } from "image-resize-compress";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./ModalsliderSwiper.css";
import { v4 as uuidv4 } from "uuid";
import { WithContext as ReactTags } from "react-tag-input";
import editor from "../../../../../redux/features/editor";
import domtoimage from "dom-to-image";
export default function Modaslider(props) {
  const [show, setShow] = useState(true);
  const [items, setItems] = useState([]);
  const [capture, setCapture] = useState([]);

  const openModal = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const cmp = props.editor.getSelected();
    let childs = cmp.find(".swiper-slide");
    setItems(childs);
  }, []);
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        id="modalswiper"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Slider Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-start align-align-items-center flex-wrap">
            {items?.map((item, i) => {
              return (
                <div className="itemslide">
                  item {i + 1}
                  <div className="actions">
                    <i class="fas fa-trash"></i>
                    <i class="fad fa-clone"></i>
                    <i class="fas fa-arrows-alt"></i>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
