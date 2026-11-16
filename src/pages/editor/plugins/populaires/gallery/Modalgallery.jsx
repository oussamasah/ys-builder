import axios from "axios";
import { fromBlob } from "image-resize-compress";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./Modalgallery.css";
import { v4 as uuidv4 } from "uuid";
import { WithContext as ReactTags } from "react-tag-input";
import editor from "../../../../../redux/features/editor";
import ArrondisConfigAccordion from "../../../compoments/Arrondis/ArrondisConfig";
export default function Modalgallery(props) {
  const [show, setShow] = useState(true);
  const [items, setItems] = useState([]);

  const openModal = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const [configRaduis, setConfigRaduis] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-raduis"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-raduis"])
      : {
          topLeft: "0",
          topRight: "0",
          bottomLeft: "0",
          bottomRight: "0",
        },
  });
  const [largeur, setLargeur] = useState(props.editor.getSelected().getAttributes()["data-largeur"]?props.editor.getSelected().getAttributes()["data-largeur"]:"false");
  const [media, setMedia] = useState([]);
  const [imageDimensions, setImageDimensions] = useState({
    height: "?",
    width: "?",
  });
  const [selected, setSelected] = useState(null);

  const loadImage = (imageUrl) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setImageDimensions({
        height: img.height,
        width: img.width,
      });
    };
    img.onerror = (err) => {
      console.error(err);
      setImageDimensions({
        height: "?",
        width: "?",
      });
    };
  };
  const changeLargeur = (value)=>{
setLargeur(value)
const cmp = props.editor.getSelected();
let attr = cmp.getAttributes();
attr["data-largeur"] = value;

cmp.setAttributes(attr);
let r = props.editor.Css.getRule(
  `#${attr.id} .container`
);
let css = [];
if (r) css = r.attributes.style;
if(value=="true"){
  css["max-width"] = "100%";
  props.editor.Css.setRule(
    `#${attr.id} .container`,css
  );
}else{
  props.editor.Css.remove(r)
}

  }
  
  const changeArrandisConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-raduis"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    setConfigRaduis(e);
    let r = props.editor.Css.getRule(`#${attr.id} .imagen`);
    let css = null;
    if (r) css = r.attributes.style;
    if (css) {
      css["border-top-left-radius"] = e.arrondis.topLeft + "px";
      css["border-top-right-radius"] = e.arrondis.topRight + "px";
      css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
      css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
      props.editor.Css.setRule(`#${attr.id} .imagen`, css);
    } else {
      props.editor.Css.setRule(`#${attr.id} .imagen`, {
        "border-top-left-radius": e.arrondis.topLeft + "px",
        "border-top-right-radius": e.arrondis.topRight + "px",
        "border-bottom-left-radius": e.arrondis.bottomLeft + "px",
        "border-bottom-right-radius": e.arrondis.bottomRight + "px",
      });
    }

    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  };
  const DeleteImg = async (item) => {
    if (selected != null && item.src == selected.src) setSelected(null);
    await axios
      .delete(process.env.REACT_APP_API_URL + "/medias/delete/" + item._id)
      .then((response) => {
        setMedia(response.data.data);
      });
  };
  const updateImg = async () => {
    toast.loading("Mise à jour en cours");
    let id = props.editor.getSelected().getAttributes()["data-ref"];
    let s = selected;
    let itemsList = items;
    const objWithIdIndex = itemsList.findIndex((x) => x._id == s._id);
    if (objWithIdIndex > -1) {
      itemsList[objWithIdIndex] = s;
    }
    setItems(itemsList);
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/plugins/updateoptionbyref/" + id,
        {
          items: itemsList,
        }
      )
      .then(async (response) => {
        setItems(response.data.data.options.items);
        let itms = response.data.data.options.items;
        toast.dismiss();
        toast.success("Mise à jour est terminé");
      });
  };

  const getItems = async () => {
    let id = props.editor.getSelected().getAttributes()["data-ref"];
    await axios
      .get(process.env.REACT_APP_API_URL + "/plugins/getbyref/" + id)
      .then((response) => {
        setItems(response.data.data.options.items);
        let itms = response.data.data.options.items;
      });
  };
  const getMedia = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/medias/getmedia/" + props.siteId)
      .then((response) => {
        setMedia(response.data.data);
      });
  };
  const handleBlob = async (blobFile) => {
    // quality value for webp and jpeg formats.
    const quality = 80;
    // output width. 0 will keep its original width and 'auto' will calculate its scale from height.
    const width = 0;
    // output height. 0 will keep its original height and 'auto' will calculate its scale from width.
    const height = 0;
    // file format: png, jpeg, bmp, gif, webp. If null, original format will be used.
    const format = "webp";

    return await fromBlob(blobFile, quality, width, height, format).then(
      (blob) => {
        // will output the converted blob file

        return blob;
      }
    );

    // note only the blobFile argument is required
  };
  const UploadMedia = async (data) => {
    toast.loading("Téléchargement en cours");
    let formData = new FormData();

    await Promise.all(
      data.map(async (element) => {
        const file = await handleBlob(element);

        formData.append("files[]", file);
      })
    );

    await axios
      .post(
        process.env.REACT_APP_API_URL + "/medias/upload/" + props.siteId,
        formData
      )
      .then((response) => {
        toast.dismiss();
        setMedia(response.data.data);
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      });
  };

  const removeItem = async (file) => {
    let n = items;
    const objWithIdIndex = n.findIndex((x) => x._id == file._id);

    if (objWithIdIndex > -1) {
      delete n[objWithIdIndex];
      var filtered = n.filter(function (el) {
        return el != null;
      });

      setItems(filtered);
    }
  };
  const addItem = async (file) => {
    let s = items;
    const x = items.filter((x) => x._id == file._id);
    if (x.length == 0) {
      setItems([...items, file]);
      s.push(file);
    }
    updateItems(s);
  };
  const updateItems = async (it) => {
    const el = props.editor.getSelected().getAttributes()["data-ref"];
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/plugins/updateoptionbyref/" + el,
        {
          items: it,
        }
      )
      .then(async (response) => {});
  };

  useEffect(() => {
    const cmp = props.editor.getSelected();

    let mediaList = items.map((i) => {
      return {
        url: i.src,
        titulo: i.title,
        description: i.description,
      };
    });
    let attr = cmp.getAttributes();
    let script = `<script>$(function(){
      const imgs = ${JSON.stringify(mediaList)};
      $.each(imgs, function(i, img){
        $('#${
          attr.id
        } .galeria .contenedorImgs').append(\`<div class="imagen" style="background-image:url(\`+img.url+\`)">
        <p class="nombre">\`+img.titulo+\`</p>
      </div>\` );
      }) ;
      setTimeout(() => {
        $('#${attr.id} .galeria').addClass('vis');
      }, 1000);
      $('#${
        attr.id
      } .galeria').on('click', '.contenedorImgs .imagen', function(){
        var imagen = imgs[$(this).index()].url;
        var titulo = imgs[$(this).index()].titulo;
        var descripcion = imgs[$(this).index()].description?imgs[$(this).index()].description:" ";
        $('#${attr.id} .galeria').addClass('scale');
        $(this).addClass('activa');
        if(!$('.fullPreview').length){
          $('body').append(\`
            <div class="fullPreview">
              <div class="cerrarModal"></div>
              <div class="wrapper">
                <div class="blur" style="background-image:url(\`+imagen+\`)"></div>
                <p class="titulo">\`+titulo+\`</p>
                <img src="\`+imagen+\`">
                <p class="desc">\`+descripcion+\`</p>
              </div>
              <div class="controles">
                <div class="control av"></div>
                <div class="control ret"></div>
              </div>
            </div>\`
          );
          $('.fullPreview').fadeIn().css('display','flex');
        }
      });
      $('body').on('click', '.fullPreview .cerrarModal', function(){
        $('.contenedorImgs .imagen.activa').removeClass('activa');
        $('#${attr.id} .galeria').removeClass('scale');
        $(this).parent().fadeOut(function(){
          $(this).remove();
        })
      });
      $('body').on('click', '.fullPreview .control', function(){
        var activa = $('.contenedorImgs .imagen.activa');
        var index;
        if($(this).hasClass('av')){
          index = activa.next().index();
          if(index < 0) index = 0;
        }else{
          index = activa.prev().index();
          if(index < 0) index = imgs.length - 1;
        }
        $('.fullPreview').addClass('anim');
        setTimeout(()=>{
          $('#${attr.id} .contenedorImgs .imagen.activa').removeClass('activa');
          $('#${attr.id} .contenedorImgs .imagen').eq(index).addClass('activa');
          $('.fullPreview').find('.blur').css('background-image', 'url('+imgs[index].url+')');
          $('.fullPreview').find('img').attr('src', imgs[index].url);
          $('.fullPreview').find('.titulo').text(imgs[index].titulo);
          $('.fullPreview').find('.desc').text(imgs[index].descripcion);
          $('.fullPreview').removeClass('anim');
        }, 500)
      });
    })</script>`;
    let css = `<style>
    .galeria {
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
    }
    .galeria.vis .container h1, .galeria.vis .container h2 {
      opacity: 1;
      transform: none;
    }
    .galeria.vis .container .h2 {
      transition-delay: 0.2s;
    }
    .galeria.vis .container .contenedorImgs .imagen {
      opacity: 1;
      transform: none;
    }
    .galeria.vis .container .contenedorImgs .imagen:nth-child(1) {
      transition-delay: 0.1s;
    }
    .galeria.vis .container .contenedorImgs .imagen:nth-child(2) {
      transition-delay: 0.2s;
    }
    .galeria.vis .container .contenedorImgs .imagen:nth-child(3) {
      transition-delay: 0.3s;
    }
    .galeria.vis .container .contenedorImgs .imagen:nth-child(4) {
      transition-delay: 0.4s;
    }
    .galeria.vis .container .contenedorImgs .imagen:nth-child(5) {
      transition-delay: 0.5s;
    }
    .galeria.vis .container .contenedorImgs .imagen:nth-child(6) {
      transition-delay: 0.6s;
    }
    .galeria.vis .container .contenedorImgs .imagen:nth-child(7) {
      transition-delay: 0.7s;
    }
    .galeria.vis .container .contenedorImgs .imagen:nth-child(8) {
      transition-delay: 0.8s;
    }
    .galeria.vis .container .contenedorImgs .imagen:nth-child(9) {
      transition-delay: 0.9s;
    }
    .galeria.vis .container .contenedorImgs .imagen:nth-child(10) {
      transition-delay: 1s;
    }
    .galeria.scale .container {
      opacity: 0;
      transform: scale(1.2);
    }
    .galeria .container {
      width: 100%%;
      transition: ease all 0.5s;
    }
    .galeria .container h1, .galeria .container h2 {
      opacity: 0;
      color: #fff;
      font-weight: 500;
      text-align: center;
      letter-spacing: 1px;
      text-transform: uppercase;
      transform: translateY(-30px);
      transition: ease all 0.5s;
    }
    .galeria .container h1 {
      font-size: 60px;
    }
    .galeria .container .contenedorImgs {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      align-content: center;
      width: 100%;
      margin-top: 30px;
    }
    .galeria .container .contenedorImgs .imagen {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: calc((100% / 3) - 20px);
      height: 250px;
      margin: 10px;
      opacity: 0;
      transform: translateX(-50px);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: ease all 0.5s;
    }
    .galeria .container .contenedorImgs .imagen:hover:before {
      opacity: 1;
    }
    .galeria .container .contenedorImgs .imagen:hover .nombre {
      transform: none;
    }
    .galeria .container .contenedorImgs .imagen:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      background: linear-gradient(transparent, #fff);
      transition: ease all 0.5s;
    }
    .galeria .container .contenedorImgs .imagen .nombre {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 90%;
      color: #fff;
      font-size: 30px;
      text-align: center;
      transform: translateY(100%);
      text-shadow: -2px -2px 5px #1c1c1c;
      transition: cubic-bezier(0.68, -0.55, 0.27, 1.55) all 0.5s;
    }
    
    .fullPreview {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      align-content: center;
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(28, 28, 28, 0.9);
      z-index: 100;
    }
    .fullPreview.anim .wrapper .titulo {
      opacity: 0;
      transform: translateX(-100px);
      transition-delay: 0s;
    }
    .fullPreview.anim .wrapper img {
      opacity: 0;
      transform: translateX(100px);
    }
    .fullPreview.anim .wrapper .desc {
      opacity: 0;
      transform: translateY(100px);
      transition-delay: 0s;
    }
    .fullPreview .cerrarModal {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      align-content: center;
      position: absolute;
      top: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #fff;
      cursor: pointer;
      z-index: 10;
      transition: ease all 0.3s;
    }
    .fullPreview .cerrarModal:hover {
      transform: rotate(90deg);
    }
    .fullPreview .cerrarModal:before, .fullPreview .cerrarModal:after {
      content: "";
      position: absolute;
      width: 50%;
      height: 2px;
      background-color: #1c1c1c;
    }
    .fullPreview .cerrarModal:before {
      transform: rotate(45deg);
    }
    .fullPreview .cerrarModal:after {
      transform: rotate(-45deg);
    }
    .fullPreview .wrapper {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      align-content: center;
      width: 90%;
      height: 90%;
      position: relative;
    }
    .fullPreview .wrapper .blur {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: blur(40px);
      transition: ease all 0.5s;
    }
    .fullPreview .wrapper .titulo {
      position: absolute;
      top: 0;
      left: 0;
      color: transparent;
      font-size: 100px;
      -webkit-text-stroke: 1px #fff;
      z-index: 1;
      transition: cubic-bezier(0.68, -0.55, 0.27, 1.55) all 0.5s 0.3s;
    }
    .fullPreview .wrapper img {
      max-width: 90%;
      max-height: 80%;
      position: relative;
      transition: cubic-bezier(0.68, -0.55, 0.27, 1.55) all 0.5s;
    }
    .fullPreview .wrapper .desc {
      width: 100%;
      max-width: 600px;
      padding: 10px 0;
      color: #fff;
      text-align: center;
      position: relative;
      transition: cubic-bezier(0.68, -0.55, 0.27, 1.55) all 0.5s 0.5s;
    }
    .fullPreview .controles {
      position: absolute;
      bottom: 30px;
      right: 30px;
    }
    .fullPreview .controles .control {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      align-content: center;
      width: 50px;
      height: 30px;
      position: relative;
      cursor: pointer;
      transition: cubic-bezier(0.68, -0.55, 0.27, 1.55) all 0.5s;
    }
    .fullPreview .controles .control:hover {
      width: 70px;
    }
    .fullPreview .controles .control.av {
      margin-left: auto;
    }
    .fullPreview .controles .control.ret {
      margin: 10px 30px 0 0;
      transform: rotate(180deg);
    }
    .fullPreview .controles .control:before, .fullPreview .controles .control:after {
      content: "";
      position: absolute;
    }
    .fullPreview .controles .control:before {
      left: 0;
      width: 80%;
      height: 2px;
      background-color: #fff;
    }
    .fullPreview .controles .control:after {
      right: 0;
      width: 10px;
      height: 10px;
      border: 2px solid #fff;
      border-bottom: 0;
      border-left: 0;
      transform: rotate(45deg);
    }</style>`;
    if (items.length != 0) {
      axios
        .post(process.env.REACT_APP_API_URL + "/plugins/updateoption/", {
          ref: cmp.get("attributes")["data-ref"],
          options: {
            items: items,
          },
          function: script,
          css: css,
        })
        .then((response) => {
          cmp.view.render();
        });
    }
  }, [items]);
  useEffect(() => {
    if (selected != null) {
      loadImage(selected.src);
    }
    console.log(selected);
  }, [selected]);

  useEffect(() => {
    getMedia();
    getItems();
  }, []);
  return (
    <div id="modalgallery">
      <Modal
        show={show}
        onHide={handleClose}
        id="ModalAddImg"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Gallerie medias</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-4">
              <Dropzone onDrop={(acceptedFiles) => UploadMedia(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()} className="drop-zone">
                      <input {...getInputProps()} />

                      <p>Déposez votre fichiers ici</p>
                    </div>
                  </section>
                )}
              </Dropzone>
              <span className="d-block text-bold mb-3">
                Bibliotheque d'images ( {media ? media.length : 0} )
              </span>
              {media && media.length > 0 ? (
                <div className="d-flex justify-content-center align-align-items-center flex-wrap biblio_list">
                  {media.map((file) => {
                    return (
                      <div
                        className="position-relative gallery-item"
                        key={file._id}
                      >
                        <img
                          src={file.src + "?v=" + uuidv4()}
                          className="thumbnails"
                          onClick={(e) => addItem(file)}
                        />
                        <i
                          className={
                            selected != null && file._id == selected._id
                              ? "fal fa-check-circle"
                              : "d-none"
                          }
                        ></i>
                        <i
                          class="fal fa-trash-alt"
                          onClick={(e) => DeleteImg(file)}
                        ></i>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="">Aucune image disponible</p>
              )}
            </div>
            <div className="col-4 border p-2">
              <span className="d-block text-bold mb-3">
                Galerie d'images ( {items ? items.length : 0} )
              </span>
              <div className=" d-flex justify-content-between align-items-center mb-3 mt-3 ombreConfig">
                    <label
                      className="form-check-label w-75"
                      htmlFor="isActivetablet"
                    >
                      Plein largeur.
                    </label>
                    <div className="form-check form-switch w-25 justify-content-end p-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={"isActivetablet"}
                        name={"isActivetablet"}
                        checked={largeur == "true"}
                        onChange={(e) => {
                          changeLargeur(e.target.checked.toString());
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                          <div class="panelTitle">Arrondis </div>
                          <ArrondisConfigAccordion
                            editor={props.editor}
                            siteId={props.siteId}
                            config={configRaduis}
                            setConfig={changeArrandisConfig}
                          />
                        </div>
              {items && items.length > 0 ? (
                <div className="d-flex justify-content-center align-align-items-center flex-wrap gallery_list">
                  {items.map((file) => {
                    return (
                      <div
                        className="position-relative gallery-item"
                        key={file._id}
                      >
                        <img
                          src={file.src + "?v=" + uuidv4()}
                          className="thumbnails"
                          onClick={(e) => setSelected(file)}
                        />
                        <i
                          className={
                            selected != null && file._id == selected._id
                              ? "fal fa-check-circle"
                              : "d-none"
                          }
                        ></i>
                        <i
                          class="fal fa-trash-alt"
                          onClick={(e) => removeItem(file)}
                        ></i>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="">Aucune image disponible</p>
              )}
            </div>
            <div className="col-4 ">
              {selected ? (
                <div>
                  <div className="fs-3 fw-bold mb-3">Info</div>
                  <div className="d-flex justify-content-start align-items-center mb-3">
                    <div className="me-3">Extension : </div>
                    <div> {" " + selected.extension}</div>
                  </div>
                  <div className="d-flex justify-content-start align-items-center mb-3">
                    <div className="me-3">Largeur : </div>
                    <div> {" " + imageDimensions.width} px</div>
                  </div>
                  <div className="d-flex justify-content-start align-items-center mb-3">
                    <div className="me-3">Hauteur : </div>
                    <div> {" " + imageDimensions.height} px</div>
                  </div>
                  <div className="d-flex justify-content-start align-items-center mb-3">
                    <div className="me-3">Taille : </div>
                    <div> {" " + selected.size} MB</div>
                  </div>
                  <div className="fs-3 fw-bold mb-3">Edit</div>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">
                      Titre d'élément :
                    </label>
                    <input
                      type="text"
                      value={selected.title ? selected.title : " "}
                      onChange={(e) =>
                        setSelected({ ...selected, title: e.target.value })
                      }
                      class="form-control"
                      id="tite"
                      placeholder="Title"
                    />
                  </div>
                  <div class="form-group mt-3 ">
                    <label for="exampleFormControlInput1">Description :</label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={selected.description ? selected.description : " "}
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div class="form-group mt-3 ">
                    <button
                      class="btn btn-success"
                      onClick={(e) => updateImg()}
                    >
                      Mise à jour
                    </button>
                  </div>
                </div>
              ) : (
                <p className="">Acune élément est sélectioné</p>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
