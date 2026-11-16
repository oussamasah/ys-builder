import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useEffect, useState } from "react";
import sliderIcon from "../../../assets/imgSliders/sliderIcon.png";
import axios from "axios";
import "./SliderManager.css";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Base64 } from "js-base64";
import MediaLibrarys from "../../MediaLibrarys/MediaLibrarys";
export default function SliderManager(props) {
  let { siteId, pageId } = useParams();
  const [show, setShow] = useState(false);
  const [dataItem, setDataItems] = useState({});
  const [Element, setElement] = useState(null);
  const [AvailbleSliders, setAvailbleSliders] = useState(null);
  const [SelectedSliderType, setSelectedSliderType] = useState(null);
  const [SelectedSliderItem, setSelectedSliderItem] = useState(null);
  const [plugin, setPlugin] = useState(null);
  const [slideParam, setSlideParam] = useState({
    //Basic Speeds
    autoplaySpeed: 200,
    paginationSpeed: 800,
    merge: true,
    margin: 0,
    mouseDrag: true,
    autoplay: false,
    autoplayHoverPause: true,

    // Navigation
    nav: true,
    navText: [`<`, `>`],
    dots: true,
    loop: true,
    rewind: false,
    autoWidth: false,
    animateIn: "fade",
    animateOut: "fade",
    pagination: true,
    paginationNumbers: true,
    /* items: 1, */
    // Responsive
    responsive: { 0: { items: 1 }, 756: { items: 1 }, 1200: { items: 1 } },
  });
  const [SliderItems, setSliderItems] = useState([]);
  const [image, setImage] = useState(null);
  const handleClose = () => setShow(false);
  const changeImage = (path) => {
    setDataItems({
      ...dataItem,
      image: process.env.REACT_APP_MEDIA_URL + path,
    });
  };
  const getSlider = async (x = true) => {
    await axios
      .get(
        process.env.REACT_APP_API_URL +
          "/plugins/getbyref/" +
          Element.getAttribute("id")
      )
      .then((response) => {
        setPlugin(response.data.data);
        setSliderItems(
          response.data.data != null ? response.data.data.options.items : []
        );
        if (x) {
          setSelectedSliderItem(
            response.data.data !== null
              ? response.data.data.options.items.length - 1
              : null
          );
        }

        setSlideParam(response.data.data.function);
        setHTML();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setDataItems(SliderItems[SelectedSliderItem]);
  }, [SelectedSliderItem]);

  useEffect(() => {
    if (props.editor()) {
      let head = props.editor().Canvas.getDocument().head;
      props.editor().Canvas.getDocument().head.replaceWith(head);
    }
    if (show === false && Element != null) {
      updateSlide();
    }
    if (show === true && Element != null) {
      getSlider();
    }
  }, [show, Element]);

  const handleShow = () => setShow(true);
  useEffect(() => {
    if (props.editor()) {
      props.editor().on("component:selected", (component) => {
        const domElement = component.getEl();

        if (domElement.dataset.gjsType == "sliderType") {
          setElement(domElement);
          setShow(true);
        } else {
          setShow(false);
        }
      });
    }

    getSliderType();
  }, [props.editor()]);

  useEffect(() => {
    setSelectedSliderType(
      AvailbleSliders != null ? AvailbleSliders[0]._id : null
    );
  }, [AvailbleSliders]);

  const changeTitleSlide = (value) => {
    setDataItems({ ...dataItem, title: value });
  };
  const changeDescSlide = (value) => {
    setDataItems({ ...dataItem, desc: value });
  };
  const changeBtnText = (value) => {
    let btnConf = dataItem.btn;
    btnConf.text = value;
    setDataItems({ ...dataItem, btn: btnConf });
  };
  const changeBtnLink = (value) => {
    let btnConf = dataItem.btn;
    btnConf.link = value;
    setDataItems({ ...dataItem, btn: btnConf });
  };
  useEffect(() => {
    let opt = SliderItems;
    opt[SelectedSliderItem] = dataItem;
    setSliderItems(opt);
  }, [dataItem]);
  const updateSlide = async () => {
    let params = SliderItems;

    await axios
      .post(process.env.REACT_APP_API_URL + "/plugins/updateoption", {
        ref: Element.getAttribute("id"),
        options: {
          items: params,
        },
        function: slideParam,
        PluginSchema: SelectedSliderType,
        PageSchema: pageId,
      })
      .then((response) => {
        getSlider(false);
      });
  };
  const addSlide = async () => {
    const itm = {
      id: uuidv4(),
      title: "Slide " + (SliderItems.length + 1),
      desc: "veuillez saiasir votre description",
      btn: { text: "contacter-nous", link: "/" },
      image:
        "https://h5p.org/sites/default/files/h5p/content/130336/images/file-59e4817d23fd2.jpeg",
    };
    let params = SliderItems;
    params.push(itm);

    await axios
      .post(process.env.REACT_APP_API_URL + "/plugins/updateoption", {
        ref: Element.getAttribute("id"),
        options: {
          items: params,
        },
        function: slideParam,
        PluginSchema: SelectedSliderType,
        PageSchema: pageId,
      })
      .then((response) => {
        getSlider();
      });
  };
  const getSliderType = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/plugins/getbytype/slider")
      .then((response) => {
        setAvailbleSliders(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setHTML = async () => {
    const cmp = props.editor().getSelected();

    let itemsHtml = ``;
    let content = `<div class="slider-gjs" id="${Element.getAttribute(
      "id"
    )}" data-gjs-editable="true" style="min-height:50px;padding:5px 0px" >`;

    if ((plugin.PluginSchema.name = "OwlCarrousel")) {
      cmp.set("attributes", { class: "slider-gjs owl-carousel owl-theme" });
    }
    if (SliderItems != null) {
      const items = SliderItems;
      items.map((item) => {
        let btn =
          item.btn.text != ""
            ? `<a href="${item.btn.link}" class="btn btn-outline-secondary d-block text-center" title="${item.btn.text}">${item.btn.text}</a>`
            : ``;
        itemsHtml += `<div class="item">
<img src="${item.image}" class="d-block" alt="${item.title}">
<div class="caption">
<div class="capblock">
<h5>${item.title}</h5>
<p>${item.desc}</p>
${btn}</div>
</div>
</div>`;
      });
      content += `
          <style>
          .slider-gjs .caption {
            position: absolute;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background: rgb(0 0 0 / 37%);
            color: white;
          }
          </style>
         
          </div>`;

      props.editor().getSelected().components(itemsHtml);
      props.editor().getSelected().toHTML();
    }
  };
  useEffect(() => {}, [slideParam, SliderItems]);

  return (
    <div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        className="offcanvas offcanvas-end "
        id="offcanvasImg"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close text-reset"
            onClick={(e) => handleClose()}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body text-light">
          <div className="d-flex justify-content-start align-items-center mb-3">
            <img src={sliderIcon} className="d-block" />
            <span className=" ms-3 ">Module Slider</span>
          </div>
          <ul className="nav nav-tabs" id="SlideTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="slide-tab"
                data-bs-toggle="tab"
                data-bs-target="#slide"
                type="button"
                role="tab"
                aria-controls="slide"
                aria-selected="false"
              >
                Parametres du Slide
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link "
                id="general-tab"
                data-bs-toggle="tab"
                data-bs-target="#general"
                type="button"
                role="tab"
                aria-controls="general"
                aria-selected="true"
              >
                Parametres Générales
              </button>
            </li>
          </ul>
          <div className="tab-content pt-3" id="SlideTabContent">
            <div
              className="tab-pane fade "
              id="general"
              role="tabpanel"
              aria-labelledby="general-tab"
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>Défiler automatiquement</div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    checked={slideParam.autoplay}
                    onChange={(e) =>
                      setSlideParam({
                        ...slideParam,
                        autoplay: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
              <div
                className={
                  slideParam.autoplay
                    ? "d-flex justify-content-between align-items-center mt-3"
                    : "d-none"
                }
              >
                <div>Vitesse du slide</div>

                <input
                  className="form-control form-control-sm configslideinput"
                  type="number"
                  min="100"
                  max="1000"
                  step={"100"}
                  value={slideParam.autoplaySpeed}
                  onChange={(e) =>
                    setSlideParam({
                      ...slideParam,
                      autoplaySpeed: e.target.value,
                    })
                  }
                />
              </div>
              <div
                className={
                  "d-flex justify-content-between align-items-center mt-3"
                }
              >
                <div>Espacement entre les slides</div>

                <input
                  className="form-control form-control-sm configslideinput"
                  type="number"
                  min="0"
                  max="30"
                  step={"1"}
                  value={slideParam.margin}
                  onChange={(e) =>
                    setSlideParam({
                      ...slideParam,
                      margin: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>Navigation</div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={slideParam.nav}
                    onChange={(e) =>
                      setSlideParam({
                        ...slideParam,
                        nav: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>Points du navigation</div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={slideParam.dots}
                    onChange={(e) =>
                      setSlideParam({
                        ...slideParam,
                        dots: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>Pagination</div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={slideParam.pagination}
                    onChange={(e) =>
                      setSlideParam({
                        ...slideParam,
                        pagination: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
              <div
                className={
                  slideParam.pagination
                    ? "d-flex justify-content-between align-items-center mt-3"
                    : "d-none"
                }
              >
                <div>Nombre du pagination</div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={slideParam.paginationNumbers}
                    onChange={(e) =>
                      setSlideParam({
                        ...slideParam,
                        paginationNumbers: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
              <div
                className={
                  slideParam.pagination
                    ? "d-flex justify-content-between align-items-center mt-3"
                    : "d-none"
                }
              >
                <div>Vitesse du pagination</div>

                <input
                  className="form-control form-control-sm configslideinput"
                  type="number"
                  min="100"
                  max="1000"
                  step={"100"}
                  value={slideParam.paginationSpeed}
                  onChange={(e) =>
                    setSlideParam({
                      ...slideParam,
                      paginationSpeed: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>Responsive</div>
              </div>
              <div
                className={
                  "d-flex justify-content-between align-items-center mt-3"
                }
              >
                <div>Nombre du slide sur desktop</div>

                <input
                  className="form-control form-control-sm configslideinput"
                  type="number"
                  value={slideParam.responsive[1200].items}
                  onChange={(e) =>
                    setSlideParam({
                      ...slideParam,
                      responsive: {
                        0: slideParam.responsive[0],
                        756: slideParam.responsive[756],
                        1200: { items: e.target.value },
                      },
                    })
                  }
                />
              </div>
              <div
                className={
                  "d-flex justify-content-between align-items-center mt-3"
                }
              >
                <div>Nombre du slide sur Tablette</div>

                <input
                  className="form-control form-control-sm configslideinput"
                  type="number"
                  value={slideParam.responsive[756].items}
                  onChange={(e) =>
                    setSlideParam({
                      ...slideParam,
                      responsive: {
                        0: slideParam.responsive[0],
                        756: { items: e.target.value },
                        1200: slideParam.responsive[1200],
                      },
                    })
                  }
                />
              </div>
              <div
                className={
                  "d-flex justify-content-between align-items-center mt-3"
                }
              >
                <div>Nombre du slide sur Mobile</div>

                <input
                  className="form-control form-control-sm configslideinput"
                  type="number"
                  value={slideParam.responsive[0].items}
                  onChange={(e) =>
                    setSlideParam({
                      ...slideParam,
                      responsive: {
                        0: { items: e.target.value },
                        756: slideParam.responsive[756],
                        1200: slideParam.responsive[1200],
                      },
                    })
                  }
                />
              </div>
            </div>
            <div
              className="tab-pane fade show active"
              id="slide"
              role="tabpanel"
              aria-labelledby="slide-tab"
            >
              <select
                className={
                  SliderItems.length == 0
                    ? "form-select form-select-sm"
                    : "d-none"
                }
                aria-label=".form-select-sm example"
                value={SelectedSliderType}
                onChange={(e) => setSelectedSliderType(e.target.value)}
              >
                {AvailbleSliders?.map((typeSlide, index) => {
                  return (
                    <option key={index} value={typeSlide._id}>
                      {typeSlide.name}
                    </option>
                  );
                })}
              </select>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <span className=" fw-bold">Source</span>
                <div className="slideSelector d-flex justify-content-between align-items-center">
                  <div
                    className={
                      SliderItems.length > 0
                        ? "d-flex justify-content-between align-items-center"
                        : "d-none"
                    }
                  >
                    <i
                      className={
                        SelectedSliderItem == 0
                          ? "fal fa-chevron-left text-dark"
                          : "fal fa-chevron-left"
                      }
                      onClick={(e) =>
                        setSelectedSliderItem(
                          SelectedSliderItem > 0 ? SelectedSliderItem - 1 : 0
                        )
                      }
                    ></i>
                    <span>{"Slide " + (SelectedSliderItem + 1)}</span>
                    <i
                      className={
                        SelectedSliderItem == SliderItems.length - 1
                          ? "fal fa-chevron-right text-dark"
                          : "fal fa-chevron-right"
                      }
                      onClick={(e) =>
                        setSelectedSliderItem(
                          SelectedSliderItem < SliderItems.length - 1
                            ? SelectedSliderItem + 1
                            : SliderItems.length - 1
                        )
                      }
                    ></i>
                  </div>
                  <i className={"fal fa-plus"} onClick={(e) => addSlide()}></i>
                </div>
              </div>
              <div className={SliderItems.length > 0 ? "d-block" : "d-none"}>
                <div className="ModalChabgeImg mt-3">
                  <div className="ModShowImg pt-3">
                    <img
                      src={dataItem?.image}
                      alt=""
                      className=" img d-block"
                    />
                    <span className="d-block titleimg mt-1">
                      {dataItem?.image != null
                        ? dataItem?.image.replace(/^.*[\\\/]/, "")
                        : ""}
                    </span>
                  </div>
                  <div className="footerDrop">
                    <MediaLibrarys
                      from={"sliderManager"}
                      siteId={siteId}
                      changeImage={changeImage}
                    />
                  </div>
                </div>
                <div className="mb-3 mt-3">
                  <label for="formFileDisabled" className="form-label">
                    Titre du slide :
                  </label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    value={dataItem?.title}
                    onChange={(e) => changeTitleSlide(e.target.value)}
                  />
                </div>
                <div className="mb-3  mt-3">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Description du slide :
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={dataItem?.desc}
                    onChange={(e) => changeDescSlide(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3 mt-3">
                  <label for="formFileDisabled" className="form-label">
                    Texte du Boutton :
                  </label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    value={dataItem?.btn?.text}
                    onChange={(e) => changeBtnText(e.target.value)}
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label for="formFileDisabled" className="form-label">
                    Lien du Boutton :
                  </label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    value={dataItem?.btn?.link}
                    onChange={(e) => changeBtnLink(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Offcanvas>
    </div>
  );
}
