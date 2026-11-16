import React, { useEffect, useState } from "react";
import {  Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
// import Nestable from "react-nestable";
import "./Modalrecentblog.css";
import { v4 as uuidv4 } from "uuid";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BlogModelOne from "../../../../../assets/ImgBlog/threepost.jpg";
import BlogModelTwo from "../../../../../assets/ImgBlog/posttabs.jpg";

import TextStylingComponent from "../../../compoments/TextStyling/TextStylingComponent";
import BorderConfig from "../../../compoments/Border/BorderConfig";
import ColorConfig from "../../../compoments/Color/ColorConfig";
import ArrondisConfig from "../../../compoments/Arrondis/ArrondisConfig";

import EspacementConfig from "../../../compoments/Espacement/EspacementConfig";
// import axios from "axios";
import OmbreConfig from "../../../compoments/Ombre/OmbreConfig";

class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".handleDrag">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
export default function Modalrecentblog(props) {
  const [params, setParams] = useState({
    nbr: 3,
    postBtnTxt: "Lire plus",
    postBtn: true,
    postDate: true,
    postCategory: true,
    postThumb: true,
    carrousel: true,
  });
  const [show, setShow] = useState(true);
  const [activeBorder, setActiveBorder] = useState(
    props.editor.getSelected().getAttributes()["data-activeborder"]
      ? props.editor.getSelected().getAttributes()["data-activeborder"]
      : "false"
  );
  const [activeBorderItemBlog, setActiveBorderItemBlog] = useState(
    props.editor.getSelected().getAttributes()["data-activeitemborder"]
      ? props.editor.getSelected().getAttributes()["data-activeitemborder"]
      : "false"
  );
  const [activeBorderCat, setActiveBorderCat] = useState(
    props.editor.getSelected().getAttributes()["data-activebordercat"]
      ? props.editor.getSelected().getAttributes()["data-activebordercat"]
      : "false"
  );
  const [activeBorderDate, setActiveBorderDate] = useState(
    props.editor.getSelected().getAttributes()["data-activeborderdate"]
      ? props.editor.getSelected().getAttributes()["data-activeborderdate"]
      : "false"
  );
  const [activeSizeInput, setActiveSizeInput] = useState(
    props.editor.getSelected().getAttributes()["data-activesizeinput"]
      ? props.editor.getSelected().getAttributes()["data-activesizeinput"]
      : "false"
  );
  const [selectedItem, setSelectedItem] = useState("");

  const [article, setArticle] = useState({
    id: props.editor.getSelected().getAttributes().id
      ? props.editor.getSelected().getAttributes().id
      : "article-" + uuidv4(),
    titlebtn: props.editor.getSelected().getAttributes()["data-namebtn"]
      ? props.editor.getSelected().getAttributes()["data-namebtn"]
      : "En savoir plus",
    titlebtnplus: props.editor.getSelected().getAttributes()["data-nameplus"]
      ? props.editor.getSelected().getAttributes()["data-nameplus"]
      : "Afficher plus",
    nameblog: props.editor.getSelected().getAttributes()["data-name-blog"]
      ? props.editor.getSelected().getAttributes()["data-name-blog"]
      : "true",
    imageblog: props.editor.getSelected().getAttributes()["data-img-blog"]
      ? props.editor.getSelected().getAttributes()["data-img-blog"]
      : "true",
    catblog: props.editor.getSelected().getAttributes()["data-cat-blog"]
      ? props.editor.getSelected().getAttributes()["data-cat-blog"]
      : "true",
    dateblog: props.editor.getSelected().getAttributes()["data-date-blog"]
      ? props.editor.getSelected().getAttributes()["data-date-blog"]
      : "true",
    showtitlebtnplus: props.editor.getSelected().getAttributes()[
      "data-show-plus"
    ]
      ? props.editor.getSelected().getAttributes()["data-show-plus"]
      : "true",
  });
  const [sizeBtn, setSizeBtn] = useState(
    props.editor.getSelected().getAttributes()["data-width-btn"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-width-btn"])
      : {
          desktop: "250",
          tablet: "250",
          mobile: "250",
        }
  );
  const [sizeBtnCarousel, setsizeBtnCarousel] = useState(
    props.editor.getSelected().getAttributes()["data-width-btnar"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-width-btnar"]
        )
      : {
          desktop: "200",
          tablet: "200",
          mobile: "200",
        }
  );
  const [sizeIconCarousel, setsizeIconCarousel] = useState(
    props.editor.getSelected().getAttributes()["data-width-icon"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-width-icon"]
        )
      : {
          desktop: "30",
          tablet: "30",
          mobile: "30",
        }
  );

  const [ConfigSizeTitle, setConfigSizeTitle] = useState({
    font: props.editor.getSelected().getAttributes()["data-et-font"]
      ? props.editor.getSelected().getAttributes()["data-et-font"]
      : "Arial",
    size: props.editor.getSelected().getAttributes()["data-et-size"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-et-size"])
      : { desktop: "16", tablet: "16", mobile: "16" },
    line: props.editor.getSelected().getAttributes()["data-et-line"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-et-line"])
      : { desktop: "16", tablet: "16", mobile: "16" },
    variant: props.editor.getSelected().getAttributes()["data-et-variant"]
      ? props.editor.getSelected().getAttributes()["data-et-variant"]
      : "500",
    align: props.editor.getSelected().getAttributes()["data-et-align"]
      ? props.editor.getSelected().getAttributes()["data-et-align"]
      : "left",
    color: props.editor.getSelected().getAttributes()["data-et-color"]
      ? props.editor.getSelected().getAttributes()["data-et-color"]
      : "#000",
  });
  const [configTextCat, setConfigTextCat] = useState({
    font: props.editor.getSelected().getAttributes()["data-cat-font"]
      ? props.editor.getSelected().getAttributes()["data-cat-font"]
      : "Arial",
    size: props.editor.getSelected().getAttributes()["data-cat-size"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-cat-size"])
      : { desktop: "16", tablet: "16", mobile: "16" },
    line: props.editor.getSelected().getAttributes()["data-cat-line"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-cat-line"])
      : { desktop: "16", tablet: "16", mobile: "16" },
    variant: props.editor.getSelected().getAttributes()["data-cat-variant"]
      ? props.editor.getSelected().getAttributes()["data-cat-variant"]
      : "500",
    align: props.editor.getSelected().getAttributes()["data-cat-align"]
      ? props.editor.getSelected().getAttributes()["data-cat-align"]
      : "left",
    color: props.editor.getSelected().getAttributes()["data-cat-color"]
      ? props.editor.getSelected().getAttributes()["data-cat-color"]
      : "#000",
  });

  const [configTextDate, setConfigTextDate] = useState({
    font: props.editor.getSelected().getAttributes()["data-date-font"]
      ? props.editor.getSelected().getAttributes()["data-date-font"]
      : "Arial",
    size: props.editor.getSelected().getAttributes()["data-date-size"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-date-size"])
      : { desktop: "16", tablet: "16", mobile: "16" },
    line: props.editor.getSelected().getAttributes()["data-date-line"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-date-line"])
      : { desktop: "16", tablet: "16", mobile: "16" },
    variant: props.editor.getSelected().getAttributes()["data-date-variant"]
      ? props.editor.getSelected().getAttributes()["data-date-variant"]
      : "500",
    align: props.editor.getSelected().getAttributes()["data-date-align"]
      ? props.editor.getSelected().getAttributes()["data-date-align"]
      : "left",
    color: props.editor.getSelected().getAttributes()["data-date-color"]
      ? props.editor.getSelected().getAttributes()["data-date-color"]
      : "#000",
  });

  const [configTextDesc, setConfigTextDesc] = useState({
    font: props.editor.getSelected().getAttributes()["data-desc-font"]
      ? props.editor.getSelected().getAttributes()["data-desc-font"]
      : "Arial",
    size: props.editor.getSelected().getAttributes()["data-desc-size"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-desc-size"])
      : { desktop: "16", tablet: "16", mobile: "16" },
    line: props.editor.getSelected().getAttributes()["data-desc-line"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-desc-line"])
      : { desktop: "16", tablet: "16", mobile: "16" },
    variant: props.editor.getSelected().getAttributes()["data-desc-variant"]
      ? props.editor.getSelected().getAttributes()["data-desc-variant"]
      : "500",
    align: props.editor.getSelected().getAttributes()["data-desc-align"]
      ? props.editor.getSelected().getAttributes()["data-desc-align"]
      : "left",
    color: props.editor.getSelected().getAttributes()["data-desc-color"]
      ? props.editor.getSelected().getAttributes()["data-desc-color"]
      : "#000",
  });

  const [ConfigsizeTextBtn, setConfigsizeTextBtn] = useState({
    font: props.editor.getSelected().getAttributes()["data-btn-fonttext"]
      ? props.editor.getSelected().getAttributes()["data-btn-fonttext"]
      : "Arial",
    size: props.editor.getSelected().getAttributes()["data-btn-sizetext"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-btn-sizetext"]
        )
      : { desktop: "16", tablet: "16", mobile: "16" },
    line: props.editor.getSelected().getAttributes()["data-btn-linetext"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-btn-linetext"]
        )
      : { desktop: "16", tablet: "16", mobile: "16" },
    variant: props.editor.getSelected().getAttributes()["data-btn-varianttext"]
      ? props.editor.getSelected().getAttributes()["data-btn-varianttext"]
      : "500",
    align: props.editor.getSelected().getAttributes()["data-btn-aligntext"]
      ? props.editor.getSelected().getAttributes()["data-btn-aligntext"]
      : "left",
    color: props.editor.getSelected().getAttributes()["data-btn-colortext"]
      ? props.editor.getSelected().getAttributes()["data-btn-colortext"]
      : "#000",
  });

  const [configsizeTextBtnCarousel, setconfigsizeTextBtnCarousel] = useState({
    font: props.editor.getSelected().getAttributes()["data-btn-fonttextar"]
      ? props.editor.getSelected().getAttributes()["data-btn-fonttextar"]
      : "FontAwesome",
    size: props.editor.getSelected().getAttributes()["data-btn-sizetextar"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-btn-sizetextar"]
        )
      : { desktop: "16", tablet: "16", mobile: "16" },
    line: props.editor.getSelected().getAttributes()["data-btn-linetextar"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-btn-linetextar"]
        )
      : { desktop: "16", tablet: "16", mobile: "16" },
    variant: props.editor.getSelected().getAttributes()[
      "data-btn-varianttextar"
    ]
      ? props.editor.getSelected().getAttributes()["data-btn-varianttextar"]
      : "500",
    align: props.editor.getSelected().getAttributes()["data-btn-aligntextar"]
      ? props.editor.getSelected().getAttributes()["data-btn-aligntextar"]
      : "left",
    color: props.editor.getSelected().getAttributes()["data-btn-colortextar"]
      ? props.editor.getSelected().getAttributes()["data-btn-colortextar"]
      : "#000",
  });
  const [configBorder, setConfigBorder] = useState({
    typeborder: props.editor.getSelected().getAttributes()["data-border-type"]
      ? props.editor.getSelected().getAttributes()["data-border-type"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-border-size"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-size"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()["data-border-style"]
      ? props.editor.getSelected().getAttributes()["data-border-style"]
      : "solid",

    color: props.editor.getSelected().getAttributes()["data-border-color"]
      ? props.editor.getSelected().getAttributes()["data-border-color"]
      : "#eee",
  });

  const [configBorderItemBlog, setConfigBorderItemBlog] = useState({
    typeborder: props.editor.getSelected().getAttributes()[
      "data-borderitem-type"
    ]
      ? props.editor.getSelected().getAttributes()["data-borderitem-type"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-borderitem-size"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-borderitem-size"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()["data-borderitem-style"]
      ? props.editor.getSelected().getAttributes()["data-borderitem-style"]
      : "solid",

    color: props.editor.getSelected().getAttributes()["data-borderitem-color"]
      ? props.editor.getSelected().getAttributes()["data-borderitem-color"]
      : "#eee",
  });
  const [configBorderButton, setConfigBorderButton] = useState({
    typeborder: props.editor.getSelected().getAttributes()[
      "data-borderbtn-type"
    ]
      ? props.editor.getSelected().getAttributes()["data-borderbtn-type"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-borderbtn-size"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-borderbtn-size"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()["data-borderbtn-style"]
      ? props.editor.getSelected().getAttributes()["data-borderbtn-style"]
      : "solid",

    color: props.editor.getSelected().getAttributes()["data-borderbtn-color"]
      ? props.editor.getSelected().getAttributes()["data-borderbtn-color"]
      : "#eee",
  });
  const [configBorderButtonCarousel, setconfigBorderButtonCarousel] = useState({
    typeborder: props.editor.getSelected().getAttributes()[
      "data-borderbtnar-type"
    ]
      ? props.editor.getSelected().getAttributes()["data-borderbtnar-type"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-borderbtnar-size"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-borderbtnar-size"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()["data-borderbtnar-style"]
      ? props.editor.getSelected().getAttributes()["data-borderbtnar-style"]
      : "solid",

    color: props.editor.getSelected().getAttributes()["data-borderbtnar-color"]
      ? props.editor.getSelected().getAttributes()["data-borderbtnar-color"]
      : "#eee",
  });
  const [configBorderButtonHover, setConfigBorderButtonHover] = useState({
    typeborder: props.editor.getSelected().getAttributes()[
      "data-borderbtnhover-type"
    ]
      ? props.editor.getSelected().getAttributes()["data-borderbtnhover-type"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-borderbtnhover-size"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-borderbtnhover-size"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()[
      "data-borderbtnhover-style"
    ]
      ? props.editor.getSelected().getAttributes()["data-borderbtnhover-style"]
      : "solid",

    color: props.editor.getSelected().getAttributes()[
      "data-borderbtnhover-color"
    ]
      ? props.editor.getSelected().getAttributes()["data-borderbtnhover-color"]
      : "#eee",
  });

  const [configBorderBtnHoverCarousel, setConfigBorderBtnHoverCarousel] =
    useState({
      typeborder: props.editor.getSelected().getAttributes()[
        "data-borderbtnhover-type"
      ]
        ? props.editor.getSelected().getAttributes()[
            "data-borderbtnhoverca-type"
          ]
        : "all",
      size: props.editor.getSelected().getAttributes()[
        "data-borderbtnhoverca-size"
      ]
        ? JSON.parse(
            props.editor.getSelected().getAttributes()[
              "data-borderbtnhoverca-size"
            ]
          )
        : {
            all: "1",
            top: "1",
            left: "1",
            right: "1",
            bottom: "1",
          },

      style: props.editor.getSelected().getAttributes()[
        "data-borderbtnhoverca-style"
      ]
        ? props.editor.getSelected().getAttributes()[
            "data-borderbtnhoverca-style"
          ]
        : "solid",

      color: props.editor.getSelected().getAttributes()[
        "data-borderbtnhover-color"
      ]
        ? props.editor.getSelected().getAttributes()[
            "data-borderbtnhoverca-color"
          ]
        : "#eee",
    });

  const [configBorderBtnHoverArticles, setConfigBorderBtnHoverArticles] =
    useState({
      typeborder: props.editor.getSelected().getAttributes()[
        "data-borderbtnar-type"
      ]
        ? props.editor.getSelected().getAttributes()["data-borderbtnar-type"]
        : "all",
      size: props.editor.getSelected().getAttributes()["data-borderbtnar-size"]
        ? JSON.parse(
            props.editor.getSelected().getAttributes()["data-borderbtnar-size"]
          )
        : {
            all: "1",
            top: "1",
            left: "1",
            right: "1",
            bottom: "1",
          },

      style: props.editor.getSelected().getAttributes()[
        "data-borderbtnhoverar-style"
      ]
        ? props.editor.getSelected().getAttributes()[
            "data-borderbtnhoverar-style"
          ]
        : "solid",

      color: props.editor.getSelected().getAttributes()[
        "data-borderbtnhoverar-color"
      ]
        ? props.editor.getSelected().getAttributes()[
            "data-borderbtnhoverar-color"
          ]
        : "#eee",
    });
  const [configBorderDate, setConfigBorderDate] = useState({
    typeborder: props.editor.getSelected().getAttributes()[
      "data-border-typedate"
    ]
      ? props.editor.getSelected().getAttributes()["data-border-typedate"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-border-sizedate"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-sizedate"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()["data-border-style"]
      ? props.editor.getSelected().getAttributes()["data-border-style"]
      : "solid",

    color: props.editor.getSelected().getAttributes()["data-border-color"]
      ? props.editor.getSelected().getAttributes()["data-border-color"]
      : "#eee",
  });
  const [configBorderDesc, setConfigBorderDesc] = useState({
    typeborder: props.editor.getSelected().getAttributes()[
      "data-borderdesc-type"
    ]
      ? props.editor.getSelected().getAttributes()["data-borderdesc-type"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-borderdesc-size"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-borderdesc-size"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()["data-borderdesc-style"]
      ? props.editor.getSelected().getAttributes()["data-borderdesc-style"]
      : "solid",

    color: props.editor.getSelected().getAttributes()["data-borderdesc-color"]
      ? props.editor.getSelected().getAttributes()["data-borderdesc-color"]
      : "#eee",
  });
  const [configBorderCat, setConfigBorderCat] = useState({
    typeborder: props.editor.getSelected().getAttributes()[
      "data-border-typecat"
    ]
      ? props.editor.getSelected().getAttributes()["data-borderbn-typecat"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-border-sizecat"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-sizecat"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()["data-border-stylecat"]
      ? props.editor.getSelected().getAttributes()["data-border-stylecat"]
      : "solid",

    color: props.editor.getSelected().getAttributes()["data-border-colorcat"]
      ? props.editor.getSelected().getAttributes()["data-border-colorcat"]
      : "#eee",
  });
  const [configRdDesc, setConfigRdDesc] = useState({
    arrondis: props.editor.getSelected().getAttributes()[
      "data-border-sizedescrd"
    ]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-sizedescrd"]
        )
      : {
          topLeft: "1",
          topRight: "1",
          bottomLeft: "1",
          bottomRight: "1",
        },
  });
  const [configRdDate, setConfigRdDate] = useState({
    arrondis: props.editor.getSelected().getAttributes()[
      "data-border-sizedaterd"
    ]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-sizedaterd"]
        )
      : {
          topLeft: "1",
          topRight: "1",
          bottomLeft: "1",
          bottomRight: "1",
        },
  });
  const [configRdTitle, setConfigRdTitle] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-raduis-title"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-raduis-title"]
        )
      : {
          topLeft: "1",
          topRight: "1",
          bottomLeft: "1",
          bottomRight: "1",
        },
  });
  const [configRdCat, setConfigRdCat] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-raduis-btns"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-raduis-btns"]
        )
      : {
          topLeft: "1",
          topRight: "1",
          bottomLeft: "1",
          bottomRight: "1",
        },
  });
  const [posAlignBtn, setPosAlignBtn] = useState({
    align: props.editor.getSelected().getAttributes()["data-pos-btn"]
      ? props.editor.getSelected().getAttributes()["data-pos-btn"]
      : "start",
  });
  const [posAlignBtnCarousel, setPosAlignBtnCarousel] = useState({
    align: props.editor.getSelected().getAttributes()["data-pos-btnar"]
      ? props.editor.getSelected().getAttributes()["data-pos-btnar"]
      : "center",
  });
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };

  const [configBgTitle, setConfigBgTitle] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-title-bg"]
      ? props.editor.getSelected().getAttributes()["data-title-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-title-bg"]
        ? props.editor.getSelected().getAttributes()["data-title-bg"]
        : "#fff"
    ),
  });
  const [configBgDate, setConfigBgDate] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-date-bg"]
      ? props.editor.getSelected().getAttributes()["data-date-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-date-bg"]
        ? props.editor.getSelected().getAttributes()["data-date-bg"]
        : "#fff"
    ),
  });
  const [configBgCat, setConfigBgCat] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-cat-bg"]
      ? props.editor.getSelected().getAttributes()["data-cat-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-cat-bg"]
        ? props.editor.getSelected().getAttributes()["data-cat-bg"]
        : "#fff"
    ),
  });
  const [configBgDesc, setConfigBgDesc] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-desc-bg"]
      ? props.editor.getSelected().getAttributes()["data-desc-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-desc-bg"]
        ? props.editor.getSelected().getAttributes()["data-desc-bg"]
        : "#fff"
    ),
  });

  const [configBgButton, setConfigBgButton] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-btn-bg"]
      ? props.editor.getSelected().getAttributes()["data-btn-bg"]
      : "#198754",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-btn-bg"]
        ? props.editor.getSelected().getAttributes()["data-btn-bg"]
        : "#198754"
    ),
  });
  const [configBgButtonCarousel, setconfigBgButtonCarousel] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-btnar-bg"]
      ? props.editor.getSelected().getAttributes()["data-btnar-bg"]
      : "#198754",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-btnar-bg"]
        ? props.editor.getSelected().getAttributes()["data-btnar-bg"]
        : "#198754"
    ),
  });

  const [configBgIconCarousel, setconfigBgIconCarousel] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-bticon-bg"]
      ? props.editor.getSelected().getAttributes()["data-bticon-bg"]
      : "#198754",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-bticon-bg"]
        ? props.editor.getSelected().getAttributes()["data-bticon-bg"]
        : "#198754"
    ),
  });
  const [configBgButtonhover, setConfigBgButtonhover] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-btn-bgh"]
      ? props.editor.getSelected().getAttributes()["data-btn-bgh"]
      : "#000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-btn-bgh"]
        ? props.editor.getSelected().getAttributes()["data-btn-bgh"]
        : "#000"
    ),
  });
  const [configBgButtonhoverArticles, setConfigBgButtonhoverArticles] =
    useState({
      rgbTxt: props.editor.getSelected().getAttributes()["data-btn-bghar"]
        ? props.editor.getSelected().getAttributes()["data-btn-bghar"]
        : "#000",
      rgb: rgbtoJson(
        props.editor.getSelected().getAttributes()["data-btn-bghar"]
          ? props.editor.getSelected().getAttributes()["data-btn-bghar"]
          : "#000"
      ),
    });
  const [configBgButtonhoverCarousel, setConfigBgButtonhoverCarousel] =
    useState({
      rgbTxt: props.editor.getSelected().getAttributes()["data-btn-bghca"]
        ? props.editor.getSelected().getAttributes()["data-btn-bghca"]
        : "#000",
      rgb: rgbtoJson(
        props.editor.getSelected().getAttributes()["data-btn-bghca"]
          ? props.editor.getSelected().getAttributes()["data-btn-bghca"]
          : "#000"
      ),
    });
  const [configBtntexthoverCarousel, setConfigBtntexthoverCarousel] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-btnca-text-hover"]
      ? props.editor.getSelected().getAttributes()["data-btnca-text-hover"]
      : "#000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-btnca-text-hover"]
        ? props.editor.getSelected().getAttributes()["data-btnca-text-hover"]
        : "#000"
    ),
  });
  const [configBgButtontexthover, setConfigBgButtonTexthover] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-btn-text-hover"]
      ? props.editor.getSelected().getAttributes()["data-btn-text-hover"]
      : "#000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-btn-text-hover"]
        ? props.editor.getSelected().getAttributes()["data-btn-text-hover"]
        : "#000"
    ),
  });
  const [configBgBtntexthoverArticles, setConfigBgBtnTexthoverArticles] =
    useState({
      rgbTxt: props.editor.getSelected().getAttributes()[
        "data-btnar-text-hover"
      ]
        ? props.editor.getSelected().getAttributes()["data-btnar-text-hover"]
        : "#000",
      rgb: rgbtoJson(
        props.editor.getSelected().getAttributes()["data-btnar-text-hover"]
          ? props.editor.getSelected().getAttributes()["data-btnar-text-hover"]
          : "#000"
      ),
    });
  const [configEspacementTitle, setConfigEspacementTitle] = useState({
    padding: props.editor.getSelected().getAttributes()["data-title-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-title-padding"]
        )
      : {
          top: "5",
          left: "5",
          right: "5",
          bottom: "5",
        },
    margin: props.editor.getSelected().getAttributes()["data-title-margin"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-title-margin"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });

  const [configEspacementItemBlog, setConfigEspacementItemBlog] = useState({
    padding: props.editor.getSelected().getAttributes()["data-item-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-item-padding"]
        )
      : {
          top: "5",
          left: "5",
          right: "5",
          bottom: "5",
        },
    margin: props.editor.getSelected().getAttributes()["data-item-margin"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-item-margin"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const [configEspacementDate, setConfigEspacementDate] = useState({
    padding: props.editor.getSelected().getAttributes()["data-date-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-date-padding"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
    margin: props.editor.getSelected().getAttributes()["data-date-margin"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-date-margin"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const [configEspacementCat, setConfigEspacementCat] = useState({
    padding: props.editor.getSelected().getAttributes()["data-cat-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-cat-padding"]
        )
      : {
          top: "15",
          left: "15",
          right: "15",
          bottom: "15",
        },
    margin: props.editor.getSelected().getAttributes()["data-cat-margin"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-cat-margin"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const [configEspacementDesc, setConfigEspacementDesc] = useState({
    padding: props.editor.getSelected().getAttributes()["data-desc-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-desc-padding"]
        )
      : {
          top: "15",
          left: "15",
          right: "15",
          bottom: "15",
        },
    margin: props.editor.getSelected().getAttributes()["data-desc-margin"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-desc-margin"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const [configEspacementBtn, setConfigEspacementBtn] = useState({
    padding: props.editor.getSelected().getAttributes()["data-btn-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-btn-padding"]
        )
      : {
          top: "15",
          left: "15",
          right: "15",
          bottom: "15",
        },
    margin: props.editor.getSelected().getAttributes()["data-btn-margin"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-btn-margin"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const [configEspacementBtnCarousel, setConfigEspacementBtnCarousel] =
    useState({
      padding: props.editor.getSelected().getAttributes()["data-btncar-padding"]
        ? JSON.parse(
            props.editor.getSelected().getAttributes()["data-btncar-padding"]
          )
        : {
            top: "15",
            left: "15",
            right: "15",
            bottom: "15",
          },
      margin: props.editor.getSelected().getAttributes()["data-btncar-margin"]
        ? JSON.parse(
            props.editor.getSelected().getAttributes()["data-btncar-margin"]
          )
        : {
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
          },
    });
  const [isActiveOmbre, setIsActiveOmbre] = useState(
    props.editor.getSelected().getAttributes()["data-ombre-isActive"]
      ? props.editor.getSelected().getAttributes()["data-ombre-isActive"]
      : false
  );
  const [shadow, setShadow] = useState({
    type: props.editor.getSelected().getAttributes()["data-ombre-type"]
      ? props.editor.getSelected().getAttributes()["data-ombre-type"]
      : "",
    size: props.editor.getSelected().getAttributes()["data-ombre-size"]
      ? props.editor.getSelected().getAttributes()["data-ombre-size"]
      : "",
  });
  const [OmbrePickerColor, setOmbrePickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-ombre-color"]
      ? props.editor.getSelected().getAttributes()["data-ombre-color"]
      : "#00000000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-ombre-color"]
        ? props.editor.getSelected().getAttributes()["data-ombre-color"]
        : "#00000000"
    ),
  });
  const changeRaduisButton = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-sizebnrd"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      css
    );
    setConfigRdButton(e);

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      css
    );
    setConfigRdButton(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeRaduisItemBlog = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-sizeitem"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .recents_posts .column`);
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .recents_posts .column`, css);
    setConfigRdButton(e);

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .recents_posts .column`, css);
    setConfigRdItemBlog(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeRaduisButtonCarousel = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-rdar-size"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .owl-nav i`);
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .owl-nav i`, css);
    setConfigRdButtonCarousel(e);

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .owl-nav i`, css);
    setConfigRdButtonCarousel(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const [SizeImg, setSizeImg] = useState({
    size: props.editor.getSelected().getAttributes()["data-size-img"]
      ? props.editor.getSelected().getAttributes()["data-size-img"]
      : 200,
  });
  const changeSizeImg = (es) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    attr["data-size-img"] = es;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .thumbnail`);
    let css = [];
    if (r) css = r.attributes.style;
    css["height"] = es + "px";
    css["object-fit"] = "contain";
    props.editor.Css.setRule(`#${attr.id} .thumbnail `, css);
    setSizeImg({ size: es });
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeEspacementBtn = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-padding"] = JSON.stringify(e.padding);
    attr["data-btn-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["padding-top"] = e.padding.top + "px";
    css["padding-bottom"] = e.padding.bottom + "px";
    css["padding-right"] = e.padding.right + "px";
    css["padding-left"] = e.padding.left + "px";
    css["margin-top"] = e.margin.top + "px";
    css["margin-bottom"] = e.margin.bottom + "px";
    css["margin-right"] = e.margin.right + "px";
    css["margin-left"] = e.margin.left + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      css
    );
    setConfigEspacementBtn(e);

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    //cmp.view.render();
  };

  const changeEspacementItemBlog = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-item-padding"] = JSON.stringify(e.padding);
    attr["data-item-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .recents_posts .column`);
    let css = [];
    if (r) css = r.attributes.style;

    css["padding-top"] = e.padding.top + "px";
    css["padding-bottom"] = e.padding.bottom + "px";
    css["padding-right"] = e.padding.right + "px";
    css["padding-left"] = e.padding.left + "px";
    css["margin-top"] = e.margin.top + "px";
    css["margin-bottom"] = e.margin.bottom + "px";
    css["margin-right"] = e.margin.right + "px";
    css["margin-left"] = e.margin.left + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .recents_posts .column`, css);
    setConfigEspacementBtn(e);

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    //cmp.view.render();
  };

  const changeEspacementBtnCarousel = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btncar-padding"] = JSON.stringify(e.padding);
    attr["data-btncar-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .owl-nav i`);
    let css = [];
    if (r) css = r.attributes.style;

    css["padding-top"] = e.padding.top + "px";
    css["padding-bottom"] = e.padding.bottom + "px";
    css["padding-right"] = e.padding.right + "px";
    css["padding-left"] = e.padding.left + "px";
    css["margin-top"] = e.margin.top + "px";
    css["margin-bottom"] = e.margin.bottom + "px";
    css["margin-right"] = e.margin.right + "px";
    css["margin-left"] = e.margin.left + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .owl-nav i`, css);
    setConfigEspacementBtnCarousel(e);

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    //cmp.view.render();
  };

  const changeTypoTitleConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-et-font"] = e.font;
    attr["data-et-variant"] = e.variant;
    attr["data-et-size"] = JSON.stringify(e.size);
    attr["data-et-line"] = JSON.stringify(e.line);
    attr["data-et-color"] = e.color;
    attr["data-et-align"] = e.align;
    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`
    );
    let css = {};
    if (r) css = r.attributes.style;
    css["font-family"] = e.font;
    css["color"] = e.color;
    css["text-align"] = e.align;
    css["font-weight"] = e.variant;
    css["font-size"] = e.size.desktop + "px";
    css["line-height"] = e.line.desktop + "px";
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`,
      css
    );

    let r_tablet = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width: 991px)",
      }
    );
    let cssTablet = {};
    if (r_tablet) cssTablet = r_tablet.attributes.style;
    cssTablet["font-size"] = e.size.tablet + "px";
    cssTablet["line-height"] = e.line.tablet + "px";
    props.editor.Css.remove(r_tablet);
    props.editor.Css.remove(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`,
      cssTablet,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );

    let r_Mobile = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width: 767px)",
      }
    );
    let cssMobile = {};
    if (r_Mobile) cssMobile = r_Mobile.attributes.style;

    cssMobile["font-size"] = `${e.size.mobile}px`;
    cssMobile["line-height"] = `${e.line.mobile}px`;

    props.editor.Css.remove(r_Mobile);
    props.editor.Css.remove(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`,
      cssMobile,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    setConfigSizeTitle(e);
    props.editor.setStyle(props.editor.getCss());
  };

  const [configRdButton, setConfigRdButton] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-border-sizebnrd"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-sizebnrd"]
        )
      : {
          topLeft: "1",
          topRight: "1",
          bottomLeft: "1",
          bottomRight: "1",
        },
  });

  const [configRdItemBlog, setConfigRdItemBlog] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-border-sizeitem"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-sizeitem"]
        )
      : {
          topLeft: "1",
          topRight: "1",
          bottomLeft: "1",
          bottomRight: "1",
        },
  });
  const [configRdButtonCarousel, setConfigRdButtonCarousel] = useState({
    arrondis: props.editor.getSelected().getAttributes()[
      "data-border-rdar-size"
    ]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-rdar-size"]
        )
      : {
          topLeft: "1",
          topRight: "1",
          bottomLeft: "1",
          bottomRight: "1",
        },
  });
  const changeTextCatConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-cat-font"] = e.font;
    attr["data-cat-variant"] = e.variant;
    attr["data-cat-size"] = JSON.stringify(e.size);
    attr["data-cat-line"] = JSON.stringify(e.line);
    attr["data-cat-color"] = e.color;
    attr["data-cat-align"] = e.align;
    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .category, #${attr.id}.${selectedItem} .post-module .category`
    );
    let css = {};
    if (r) css = r.attributes.style;
    css["font-family"] = e.font;
    css["color"] = e.color;
    css["text-align"] = e.align;
    css["font-weight"] = e.variant;
    css["font-size"] = e.size.desktop + "px";
    css["line-height"] = e.line.desktop + "px";
    props.editor.Css.setRule(
      `#${attr.id} .post-module .category, #${attr.id}.${selectedItem} .post-module .category`,
      css
    );

    let r_tablet = props.editor.Css.getRule(
      `#${attr.id} .post-module .category, #${attr.id}.${selectedItem} .post-module .category`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width: 991px)",
      }
    );
    let cssTablet = {};
    if (r_tablet) cssTablet = r_tablet.attributes.style;
    cssTablet["font-size"] = e.size.tablet + "px";
    cssTablet["line-height"] = e.line.tablet + "px";
    props.editor.Css.remove(r_tablet);
    props.editor.Css.remove(
      `#${attr.id} .post-module .category, #${attr.id}.${selectedItem} .post-module .category`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .post-module .category, #${attr.id}.${selectedItem} .post-module .category`,
      cssTablet,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );

    let r_Mobile = props.editor.Css.getRule(
      `#${attr.id} .post-module .category, #${attr.id}.${selectedItem} .post-module .category`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width: 767px)",
      }
    );
    let cssMobile = {};
    if (r_Mobile) cssMobile = r_Mobile.attributes.style;

    cssMobile["font-size"] = `${e.size.mobile}px`;
    cssMobile["line-height"] = `${e.line.mobile}px`;

    props.editor.Css.remove(r_Mobile);
    props.editor.Css.remove(
      `#${attr.id} .post-module .category, #${attr.id}.${selectedItem} .post-module .category`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .post-module .category, #${attr.id}.${selectedItem} .post-module .category`,
      cssMobile,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    setConfigTextCat(e);
    props.editor.setStyle(props.editor.getCss());
  };

  const changeTextDateConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-date-font"] = e.font;
    attr["data-date-variant"] = e.variant;
    attr["data-date-size"] = JSON.stringify(e.size);
    attr["data-date-line"] = JSON.stringify(e.line);
    attr["data-date-color"] = e.color;
    attr["data-date-align"] = e.align;
    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`
    );
    let css = {};
    if (r) css = r.attributes.style;
    css["font-family"] = e.font;
    css["color"] = e.color;
    css["text-align"] = e.align;
    css["font-weight"] = e.variant;
    css["font-size"] = e.size.desktop + "px";
    css["line-height"] = e.line.desktop + "px";
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`,
      css
    );

    let r_tablet = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width: 991px)",
      }
    );
    let cssTablet = {};
    if (r_tablet) cssTablet = r_tablet.attributes.style;
    cssTablet["font-size"] = e.size.tablet + "px";
    cssTablet["line-height"] = e.line.tablet + "px";
    props.editor.Css.remove(r_tablet);
    props.editor.Css.remove(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`,
      cssTablet,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );

    let r_Mobile = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width: 767px)",
      }
    );
    let cssMobile = {};
    if (r_Mobile) cssMobile = r_Mobile.attributes.style;

    cssMobile["font-size"] = `${e.size.mobile}px`;
    cssMobile["line-height"] = `${e.line.mobile}px`;

    props.editor.Css.remove(r_Mobile);
    props.editor.Css.remove(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`,
      cssMobile,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    setConfigTextDate(e);
    props.editor.setStyle(props.editor.getCss());
  };

  const changeTextDescConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-desc-font"] = e.font;
    attr["data-desc-variant"] = e.variant;
    attr["data-desc-size"] = JSON.stringify(e.size);
    attr["data-desc-line"] = JSON.stringify(e.line);
    attr["data-desc-color"] = e.color;
    attr["data-desc-align"] = e.align;
    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`
    );
    let css = {};
    if (r) css = r.attributes.style;
    css["font-family"] = e.font;
    css["color"] = e.color;
    css["text-align"] = e.align;
    css["font-weight"] = e.variant;
    css["font-size"] = e.size.desktop + "px";
    css["line-height"] = e.line.desktop + "px";
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`,
      css
    );

    let r_tablet = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width: 991px)",
      }
    );
    let cssTablet = {};
    if (r_tablet) cssTablet = r_tablet.attributes.style;
    cssTablet["font-size"] = e.size.tablet + "px";
    cssTablet["line-height"] = e.line.tablet + "px";
    props.editor.Css.remove(r_tablet);
    props.editor.Css.remove(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`,
      cssTablet,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );

    let r_Mobile = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width: 767px)",
      }
    );
    let cssMobile = {};
    if (r_Mobile) cssMobile = r_Mobile.attributes.style;

    cssMobile["font-size"] = `${e.size.mobile}px`;
    cssMobile["line-height"] = `${e.line.mobile}px`;

    props.editor.Css.remove(r_Mobile);
    props.editor.Css.remove(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`,
      cssMobile,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    setConfigTextDesc(e);
    props.editor.setStyle(props.editor.getCss());
  };

  const changetextBtnConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    attr["data-btn-fonttext"] = e.font;
    attr["data-btn-varianttext"] = e.variant;
    attr["data-btn-sizetext"] = JSON.stringify(e.size);
    attr["data-btn-colortext"] = e.color;
    attr["data-btn-aligntext"] = e.align;
    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`
    );
    let css = {};
    if (r) css = r.attributes.style;
    css["font-family"] = e.font;
    css["color"] = e.color;
    css["text-align"] = e.align;
    css["font-weight"] = e.variant;
    css["font-size"] = e.size.desktop + "px";
    css["line-height"] = e.line.desktop + "px";
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      css
    );

    let r_tablet = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width: 991px)",
      }
    );
    let cssTablet = {};
    if (r_tablet) cssTablet = r_tablet.attributes.style;
    cssTablet["font-size"] = e.size.tablet + "px";
    cssTablet["line-height"] = e.line.tablet + "px";
    props.editor.Css.remove(r_tablet);
    props.editor.Css.remove(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      cssTablet,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );

    let r_Mobile = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width: 767px)",
      }
    );

    let cssMobile = {};
    if (r_Mobile) cssMobile = r_Mobile.attributes.style;

    cssMobile["font-size"] = `${e.size.mobile}px`;
    cssMobile["line-height"] = `${e.line.mobile}px`;

    props.editor.Css.remove(r_Mobile);
    props.editor.Css.remove(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      cssMobile,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    setConfigsizeTextBtn(e);
    props.editor.setStyle(props.editor.getCss());
  };

  // const changetextBtnConfigCarousel = (e) => {
  //   const cmp = props.editor.getSelected();
  //   let attr = cmp.getAttributes();

  //   attr["data-btn-fonttextar"] = e.font;
  //   attr["data-btn-varianttextar"] = e.variant;
  //   attr["data-btn-sizetextar"] = JSON.stringify(e.size);
  //   attr["data-btn-colortextar"] = e.color;
  //   attr["data-btn-aligntextar"] = e.align;
  //   cmp.setAttributes(attr);

  //   let r = props.editor.Css.getRule(
  //     `#${attr.id} .owl-nav i`
  //   );
  //   let css = {};
  //   if (r) css = r.attributes.style;
  //   css["font-family"] = e.font;
  //   css["color"] = e.color;
  //   css["text-align"] = e.align;
  //   css["font-weight"] = e.variant;
  //   css["font-size"] = e.size.desktop + "px";
  //   css["line-height"] = e.line.desktop + "px";
  //   props.editor.Css.setRule(
  //     `#${attr.id} .owl-nav i`,
  //     css
  //   );

  //   let r_tablet = props.editor.Css.getRule(
  //     `#${attr.id} .owl-nav i`,
  //     {
  //       atRuleType: "media",
  //       atRuleParams: "(min-width: 768px) and (max-width: 991px)",
  //     }
  //   );
  //   let cssTablet = {};
  //   if (r_tablet) cssTablet = r_tablet.attributes.style;
  //   cssTablet["font-size"] = e.size.tablet + "px";
  //   cssTablet["line-height"] = e.line.tablet + "px";
  //   props.editor.Css.remove(r_tablet);
  //   props.editor.Css.remove(
  //     `#${attr.id} .owl-nav i`,
  //     {
  //       atRuleType: "media",
  //       atRuleParams: "(min-width:768px) and (max-width:991px)",
  //     }
  //   );
  //   props.editor.Css.setRule(
  //     `#${attr.id} .owl-nav i`,
  //     cssTablet,
  //     {
  //       atRuleType: "media",
  //       atRuleParams: "(min-width:768px) and (max-width:991px)",
  //     }
  //   );

  //   let r_Mobile = props.editor.Css.getRule(
  //     `#${attr.id} .owl-nav i`,
  //     {
  //       atRuleType: "media",
  //       atRuleParams: "(max-width: 767px)",
  //     }
  //   );

  //   let cssMobile = {};
  //   if (r_Mobile) cssMobile = r_Mobile.attributes.style;

  //   cssMobile["font-size"] = `${e.size.mobile}px`;
  //   cssMobile["line-height"] = `${e.line.mobile}px`;

  //   props.editor.Css.remove(r_Mobile);
  //   props.editor.Css.remove(
  //     `#${attr.id} .owl-nav i`,
  //     {
  //       atRuleType: "media",
  //       atRuleParams: "(max-width:767px)",
  //     }
  //   );
  //   props.editor.Css.setRule(
  //     `#${attr.id} .owl-nav i`,
  //     cssMobile,
  //     {
  //       atRuleType: "media",
  //       atRuleParams: "(max-width:767px)",
  //     }
  //   );
  //   setconfigsizeTextBtnCarousel(e);
  //   props.editor.setStyle(props.editor.getCss());
  // };

  const changeRaduisDesc = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-sizedescrd"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`,
      css
    );
    setConfigRdDesc(e);

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`,
      css
    );
    setConfigRdDesc(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const changeRaduisDate = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-sizedaterd"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`,
      css
    );
    setConfigRdDate(e);

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`,
      css
    );
    setConfigRdDate(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changePostionBtn = (position) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let device = props.editor.Devices.getSelected().id;
    if (device == "mobile2") {
      let r = props.editor.Css.getRule(
        `#${attr.id} .buttonarticle,#${attr.id}.${selectedItem} .buttonarticle`,
        {
          atRuleType: "media",
          atRuleParams: "(max-width:767px)",
        }
      );
      let css = [];
      if (r) css = r.attributes.style;
      css["justify-content"] = position;
      css["display"] = "flex";
      props.editor.Css.setRule(
        `#${attr.id} .buttonarticle,#${attr.id}.${selectedItem} .buttonarticle`,
        css,
        {
          atRuleType: "media",
          atRuleParams: "(max-width:767px)",
        }
      );
    } else {
      let r = props.editor.Css.getRule(
        `#${attr.id} .buttonarticle,#${attr.id}.${selectedItem} .buttonarticle`
      );
      let css = [];
      if (r) css = r.attributes.style;
      css["display"] = "flex";
      css["justify-content"] = position;
      props.editor.Css.setRule(
        `#${attr.id} .buttonarticle,#${attr.id}.${selectedItem} .buttonarticle`,
        css
      );
    }

    attr["data-pos-btn"] = position;
    cmp.setAttributes(attr);

    setPosAlignBtn({ align: position });
    props.editor.setStyle(props.editor.getCss());
  };

  const changePostionBtnCarousel = (position) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let device = props.editor.Devices.getSelected().id;
    if (device == "mobile2") {
      let r = props.editor.Css.getRule(`#${attr.id} .owl-nav`, {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      });
      let css = [];
      if (r) css = r.attributes.style;
      css["justify-content"] = position;
      css["display"] = "flex";
      props.editor.Css.setRule(`#${attr.id} .owl-nav`, css, {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      });
    } else {
      let r = props.editor.Css.getRule(`#${attr.id} .owl-nav`);
      let css = [];
      if (r) css = r.attributes.style;
      css["display"] = "flex";
      css["justify-content"] = position;
      props.editor.Css.setRule(`#${attr.id} .owl-nav`, css);
    }

    attr["data-pos-btnar"] = position;
    cmp.setAttributes(attr);

    setPosAlignBtnCarousel({ align: position });
    props.editor.setStyle(props.editor.getCss());
  };

  const changeEspacementTitle = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-title-padding"] = JSON.stringify(e.padding);
    attr["data-title-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["padding-top"] = e.padding.top + "px";
    css["padding-bottom"] = e.padding.bottom + "px";
    css["padding-right"] = e.padding.right + "px";
    css["padding-left"] = e.padding.left + "px";
    css["margin-top"] = e.margin.top + "px";
    css["margin-bottom"] = e.margin.bottom + "px";
    css["margin-right"] = e.margin.right + "px";
    css["margin-left"] = e.margin.left + "px";

    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`,
      css
    );
    setConfigEspacementTitle(e);

    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`,
      css
    );
    setConfigEspacementTitle(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeEspacementDate = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-date-padding"] = JSON.stringify(e.padding);
    attr["data-date-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["padding-top"] = e.padding.top + "px";
    css["padding-bottom"] = e.padding.bottom + "px";
    css["padding-right"] = e.padding.right + "px";
    css["padding-left"] = e.padding.left + "px";
    css["margin-top"] = e.margin.top + "px";
    css["margin-bottom"] = e.margin.bottom + "px";
    css["margin-right"] = e.margin.right + "px";
    css["margin-left"] = e.margin.left + "px";

    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`,
      css
    );
    setConfigEspacementDate(e);

    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`,
      css
    );
    setConfigEspacementDate(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeEspacementCat = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-cat-padding"] = JSON.stringify(e.padding);
    attr["data-cat-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .category, #${attr.id}.${selectedItem} .post-module .category`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["padding-top"] = e.padding.top + "px";
    css["padding-bottom"] = e.padding.bottom + "px";
    css["padding-right"] = e.padding.right + "px";
    css["padding-left"] = e.padding.left + "px";
    css["margin-top"] = e.margin.top + "px";
    css["margin-bottom"] = e.margin.bottom + "px";
    css["margin-right"] = e.margin.right + "px";
    css["margin-left"] = e.margin.left + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .category, #${attr.id}.${selectedItem} .post-module .category`,
      css
    );
    setConfigEspacementCat(e);

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    //cmp.view.render();
  };
  const changeEspacementDesc = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-desc-padding"] = JSON.stringify(e.padding);
    attr["data-desc-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["padding-top"] = e.padding.top + "px";
    css["padding-bottom"] = e.padding.bottom + "px";
    css["padding-right"] = e.padding.right + "px";
    css["padding-left"] = e.padding.left + "px";
    css["margin-top"] = e.margin.top + "px";
    css["margin-bottom"] = e.margin.bottom + "px";
    css["margin-right"] = e.margin.right + "px";
    css["margin-left"] = e.margin.left + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`,
      css
    );
    setConfigEspacementDesc(e);

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    //cmp.view.render();
  };
  const changeRaduisTitle = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-raduis-title"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`,
      css
    );
    setConfigRdTitle(e);

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    //cmp.view.render();
  };
  const changeRaduisCat = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-raduis-btns"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .category`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .category`,
      css
    );
    setConfigRdCat(e);

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    //cmp.view.render();
  };
  const changeBorderCat = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-sizecat"] = JSON.stringify(e.size);
    attr["data-border-stylecat"] = e.style;
    attr["data-border-colorcat"] = e.color;
    attr["data-border-typecat"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .category,#${attr.id}.${selectedItem} .post-module .category`
    );
    let css = [];
    if (r) css = r.attributes.style;
    switch (e.typeborder) {
      case "all":
        css["border"] = e.size.all + "px" + " " + e.style + " " + e.color;

        break;
      case "top":
        css["border-top"] = e.size.top + "px" + " " + e.style + " " + e.color;

        break;
      case "bottom":
        css["border-bottom"] =
          e.size.bottom + "px" + " " + e.style + " " + e.color;
        break;
      case "left":
        css["border-left"] = e.size.left + "px" + " " + e.style + " " + e.color;
        break;
      case "right":
        css["border-right"] =
          e.size.right + "px" + " " + e.style + " " + e.color;

        break;
      default:
        break;
    }
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .category,#${attr.id}.${selectedItem} .post-module .category`,
      css
    );
    setConfigBorderCat(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeBorderItemBlog = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-borderitem-size"] = JSON.stringify(e.size);
    attr["data-borderitem-style"] = e.style;
    attr["data-borderitem-color"] = e.color;
    attr["data-borderitem-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .recents_posts .column`);
    let css = [];
    if (r) css = r.attributes.style;
    switch (e.typeborder) {
      case "all":
        css["border"] = e.size.all + "px" + " " + e.style + " " + e.color;

        break;
      case "top":
        css["border-top"] = e.size.top + "px" + " " + e.style + " " + e.color;

        break;
      case "bottom":
        css["border-bottom"] =
          e.size.bottom + "px" + " " + e.style + " " + e.color;
        break;
      case "left":
        css["border-left"] = e.size.left + "px" + " " + e.style + " " + e.color;
        break;
      case "right":
        css["border-right"] =
          e.size.right + "px" + " " + e.style + " " + e.color;

        break;
      default:
        break;
    }
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .recents_posts .column`, css);
    setConfigBorderItemBlog(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeBorderButton = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-borderbtn-size"] = JSON.stringify(e.size);
    attr["data-borderbtn-style"] = e.style;
    attr["data-borderbtn-color"] = e.color;
    attr["data-borderbtn-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`
    );
    let css = [];
    if (r) css = r.attributes.style;
    switch (e.typeborder) {
      case "all":
        css["border"] = e.size.all + "px" + " " + e.style + " " + e.color;

        break;
      case "top":
        css["border-top"] = e.size.top + "px" + " " + e.style + " " + e.color;

        break;
      case "bottom":
        css["border-bottom"] =
          e.size.bottom + "px" + " " + e.style + " " + e.color;
        break;
      case "left":
        css["border-left"] = e.size.left + "px" + " " + e.style + " " + e.color;
        break;
      case "right":
        css["border-right"] =
          e.size.right + "px" + " " + e.style + " " + e.color;

        break;
      default:
        break;
    }
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      css
    );
    setConfigBorderButton(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeBorderButtonCarousel = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-borderbtnar-size"] = JSON.stringify(e.size);
    attr["data-borderbtnar-style"] = e.style;
    attr["data-borderbtnar-color"] = e.color;
    attr["data-borderbtnar-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .owl-nav i`);
    let css = [];
    if (r) css = r.attributes.style;
    switch (e.typeborder) {
      case "all":
        css["border"] = e.size.all + "px" + " " + e.style + " " + e.color;

        break;
      case "top":
        css["border-top"] = e.size.top + "px" + " " + e.style + " " + e.color;

        break;
      case "bottom":
        css["border-bottom"] =
          e.size.bottom + "px" + " " + e.style + " " + e.color;
        break;
      case "left":
        css["border-left"] = e.size.left + "px" + " " + e.style + " " + e.color;
        break;
      case "right":
        css["border-right"] =
          e.size.right + "px" + " " + e.style + " " + e.color;

        break;
      default:
        break;
    }
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .owl-nav i`, css);
    setconfigBorderButtonCarousel(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeBorderButtonHover = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-borderbtn-size"] = JSON.stringify(e.size);
    attr["data-borderbtn-style"] = e.style;
    attr["data-borderbtn-color"] = e.color;
    attr["data-borderbtn-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .savoirplus:hover,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus:hover`
    );
    let css = [];
    if (r) css = r.attributes.style;
    switch (e.typeborder) {
      case "all":
        css["border"] = e.size.all + "px" + " " + e.style + " " + e.color;

        break;
      case "top":
        css["border-top"] = e.size.top + "px" + " " + e.style + " " + e.color;

        break;
      case "bottom":
        css["border-bottom"] =
          e.size.bottom + "px" + " " + e.style + " " + e.color;
        break;
      case "left":
        css["border-left"] = e.size.left + "px" + " " + e.style + " " + e.color;
        break;
      case "right":
        css["border-right"] =
          e.size.right + "px" + " " + e.style + " " + e.color;

        break;
      default:
        break;
    }
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .savoirplus:hover,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus:hover`,
      css
    );
    setConfigBorderButtonHover(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeBorderBtnHoverArticles = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-borderbtnar-size"] = JSON.stringify(e.size);
    attr["data-borderbtnar-style"] = e.style;
    attr["data-borderbtnar-color"] = e.color;
    attr["data-borderbtnar-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .blogplus:hover,#${attr.id}.${selectedItem} .blogplus:hover`
    );
    let css = [];
    if (r) css = r.attributes.style;
    switch (e.typeborder) {
      case "all":
        css["border"] = e.size.all + "px" + " " + e.style + " " + e.color;

        break;
      case "top":
        css["border-top"] = e.size.top + "px" + " " + e.style + " " + e.color;

        break;
      case "bottom":
        css["border-bottom"] =
          e.size.bottom + "px" + " " + e.style + " " + e.color;
        break;
      case "left":
        css["border-left"] = e.size.left + "px" + " " + e.style + " " + e.color;
        break;
      case "right":
        css["border-right"] =
          e.size.right + "px" + " " + e.style + " " + e.color;

        break;
      default:
        break;
    }
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .blogplus:hover,#${attr.id}.${selectedItem} .blogplus:hover`,
      css
    );
    setConfigBorderBtnHoverArticles(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeBorderBtnHoverCarousel = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-borderbtnhoverca-size"] = JSON.stringify(e.size);
    attr["data-borderbtnhoverca-style"] = e.style;
    attr["data-borderbtnhoverca-color"] = e.color;
    attr["data-borderbtnhoverca-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .owl-nav i:hover`);
    let css = [];
    if (r) css = r.attributes.style;
    switch (e.typeborder) {
      case "all":
        css["border"] = e.size.all + "px" + " " + e.style + " " + e.color;

        break;
      case "top":
        css["border-top"] = e.size.top + "px" + " " + e.style + " " + e.color;

        break;
      case "bottom":
        css["border-bottom"] =
          e.size.bottom + "px" + " " + e.style + " " + e.color;
        break;
      case "left":
        css["border-left"] = e.size.left + "px" + " " + e.style + " " + e.color;
        break;
      case "right":
        css["border-right"] =
          e.size.right + "px" + " " + e.style + " " + e.color;

        break;
      default:
        break;
    }
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .owl-nav i:hover`, css);
    setConfigBorderBtnHoverCarousel(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeBorderDate = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-sizedate"] = JSON.stringify(e.size);
    attr["data-border-styledate"] = e.style;
    attr["data-border-colordate"] = e.color;
    attr["data-border-typedate"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .timestamp,#${attr.id}.${selectedItem} .post-module .post-content .timestamp`
    );
    let css = [];
    if (r) css = r.attributes.style;
    switch (e.typeborder) {
      case "all":
        css["border"] = e.size.all + "px" + " " + e.style + " " + e.color;

        break;
      case "top":
        css["border-top"] = e.size.top + "px" + " " + e.style + " " + e.color;

        break;
      case "bottom":
        css["border-bottom"] =
          e.size.bottom + "px" + " " + e.style + " " + e.color;
        break;
      case "left":
        css["border-left"] = e.size.left + "px" + " " + e.style + " " + e.color;
        break;
      case "right":
        css["border-right"] =
          e.size.right + "px" + " " + e.style + " " + e.color;

        break;
      default:
        break;
    }
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .timestamp,#${attr.id}.${selectedItem} .post-module .post-content .timestamp`,
      css
    );
    setConfigBorderDate(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const changeBorderDesc = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-borderdesc-size"] = JSON.stringify(e.size);
    attr["data-borderdesc-style"] = e.style;
    attr["data-borderdesc-color"] = e.color;
    attr["data-borderdesc-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .description,#${attr.id}.${selectedItem} .post-module .post-content .description`
    );
    let css = [];
    if (r) css = r.attributes.style;
    switch (e.typeborder) {
      case "all":
        css["border"] = e.size.all + "px" + " " + e.style + " " + e.color;

        break;
      case "top":
        css["border-top"] = e.size.top + "px" + " " + e.style + " " + e.color;

        break;
      case "bottom":
        css["border-bottom"] =
          e.size.bottom + "px" + " " + e.style + " " + e.color;
        break;
      case "left":
        css["border-left"] = e.size.left + "px" + " " + e.style + " " + e.color;
        break;
      case "right":
        css["border-right"] =
          e.size.right + "px" + " " + e.style + " " + e.color;

        break;
      default:
        break;
    }
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .description,#${attr.id}.${selectedItem} .post-module .post-content .description`,
      css
    );
    setConfigBorderDesc(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeSize = (device, value) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let s = { ...sizeBtn };
    s[device] = value;
    setSizeBtn(s);
    attr["data-width-btn"] = JSON.stringify(s);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`
    );
    let css = {};
    if (r) css = r.attributes.style;
    css["width"] = s.desktop + "px";
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      css
    );

    let r_tablet = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width:991px)",
      }
    );
    let cssTablet = {};
    if (r_tablet) css = r_tablet.attributes.style;
    cssTablet["width"] = s.tablet + "px";

    let r_Mobile = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width: 767px)",
      }
    );

    let cssMobile = {};
    if (r_Mobile) css = r_Mobile.attributes.style;

    cssMobile["width"] = s.mobile + "px";
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      cssTablet,
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      cssMobile,
      {
        atRuleType: "media",
        atRuleParams: "(max-width: 767px)",
      }
    );

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
  };

  const changesizeIconCarousel = (device, value) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let s = { ...sizeBtnCarousel };
    s[device] = value;
    setsizeIconCarousel(s);
    attr["data-width-icon"] = JSON.stringify(s);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .owl-nav i`);
    let css = {};
    if (r) css = r.attributes.style;
    css["font-size"] = s.desktop + "px";
    props.editor.Css.setRule(`#${attr.id} .owl-nav i`, css);

    let r_tablet = props.editor.Css.getRule(`#${attr.id} .owl-nav i`, {
      atRuleType: "media",
      atRuleParams: "(min-width: 768px) and (max-width:991px)",
    });
    let cssTablet = {};
    if (r_tablet) css = r_tablet.attributes.style;
    cssTablet["font-size"] = s.tablet + "px";

    let r_Mobile = props.editor.Css.getRule(`#${attr.id} .owl-nav i`, {
      atRuleType: "media",
      atRuleParams: "(max-width: 767px)",
    });

    let cssMobile = {};
    if (r_Mobile) css = r_Mobile.attributes.style;

    cssMobile["font-size"] = s.mobile + "px";
    props.editor.Css.setRule(`#${attr.id} .owl-nav i`, cssTablet, {
      atRuleType: "media",
      atRuleParams: "(min-width: 768px) and (max-width:991px)",
    });
    props.editor.Css.setRule(`#${attr.id} .owl-nav i`, cssMobile, {
      atRuleType: "media",
      atRuleParams: "(max-width: 767px)",
    });

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
  };
  // const changesizeBtnCarousel = (device, value) => {
  //   let cmp = props.editor.getSelected();
  //   let attr = cmp.getAttributes();
  //   let s = { ...sizeBtnCarousel };
  //   s[device] = value;
  //   setsizeBtnCarousel(s);
  //   attr["data-width-btnar"] = JSON.stringify(s);
  //   cmp.setAttributes(attr);
  //   let r = props.editor.Css.getRule(`#${attr.id} .owl-carousel .owl-nav button.owl-next, #${attr.id} .owl-carousel .owl-nav button.owl-prev`);
  //   let css = {};
  //   if (r) css = r.attributes.style;
  //   css["width"] = s.desktop + "px";
  //   css["height"] = s.desktop + "px";
  //   css["display"] =  "flex";
  //   css["jutify-content"] =  "center";
  //   css["align-item"] =  "center";
  //   props.editor.Css.setRule(`#${attr.id} .owl-nav i`, css);

  //   let r_tablet = props.editor.Css.getRule(`#${attr.id} .owl-carousel .owl-nav button.owl-next, #${attr.id} .owl-carousel .owl-nav button.owl-prev`, {
  //     atRuleType: "media",
  //     atRuleParams: "(min-width: 768px) and (max-width:991px)",
  //   });
  //   let cssTablet = {};
  //   if (r_tablet) css = r_tablet.attributes.style;
  //   cssTablet["width"] = s.tablet + "px";
  //   cssTablet["height"] = s.tablet + "px";

  //   let r_Mobile = props.editor.Css.getRule(`#${attr.id} .owl-carousel .owl-nav button.owl-next, #${attr.id} .owl-carousel .owl-nav button.owl-prev`, {
  //     atRuleType: "media",
  //     atRuleParams: "(max-width: 767px)",
  //   });

  //   let cssMobile = {};
  //   if (r_Mobile) css = r_Mobile.attributes.style;

  //   cssMobile["width"] = s.mobile + "px";
  //   cssMobile["height"] = s.mobile + "px";
  //   props.editor.Css.setRule(`#${attr.id} .owl-carousel .owl-nav button.owl-next, #${attr.id} .owl-carousel .owl-nav button.owl-prev`, cssTablet, {
  //     atRuleType: "media",
  //     atRuleParams: "(min-width: 768px) and (max-width:991px)",
  //   });
  //   props.editor.Css.setRule(`#${attr.id} .owl-carousel .owl-nav button.owl-next, #${attr.id} .owl-carousel .owl-nav button.owl-prev`, cssMobile, {
  //     atRuleType: "media",
  //     atRuleParams: "(max-width: 767px)",
  //   });

  //   let cssStyles = props.editor.getCss();
  //   props.editor.setStyle(cssStyles);
  // };
  const changeBorder = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-size"] = JSON.stringify(e.size);
    attr["data-border-style"] = e.style;
    attr["data-border-color"] = e.color;
    attr["data-border-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`
    );
    let css = [];
    if (r) css = r.attributes.style;
    switch (e.typeborder) {
      case "all":
        css["border"] = e.size.all + "px" + " " + e.style + " " + e.color;

        break;
      case "top":
        css["border-top"] = e.size.top + "px" + " " + e.style + " " + e.color;

        break;
      case "bottom":
        css["border-bottom"] =
          e.size.bottom + "px" + " " + e.style + " " + e.color;
        break;
      case "left":
        css["border-left"] = e.size.left + "px" + " " + e.style + " " + e.color;
        break;
      case "right":
        css["border-right"] =
          e.size.right + "px" + " " + e.style + " " + e.color;

        break;
      default:
        break;
    }
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`,
      css
    );
    setConfigBorder(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const changeBackgroundTitle = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-title-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .titleblog, #${attr.id}.${selectedItem} .post-module .post-content .titleblog`,
      css
    );
    setConfigBgTitle(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeBackgroundDate = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-title-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .timestamp, #${attr.id}.${selectedItem} .post-module .post-content .timestamp`,
      css
    );
    setConfigBgDate(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeBackgroundDesc = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-desc-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .description, #${attr.id}.${selectedItem} .post-module .post-content .description`,
      css
    );
    setConfigBgDesc(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const setOmbreConfig = (isActive, configShadow, color) => {
    setOmbrePickerColor(color);
    setIsActiveOmbre(isActive);
    setShadow(shadow);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-ombre-isActive"] = isActive;
    attr["data-ombre-color"] = color.rgbTxt;
    attr["data-ombre-type"] = configShadow.type;
    attr["data-ombre-size"] = configShadow.size;
    // console.log(configShadow.type);
    let r = props.editor.Css.getRule(`#${attr.id} .recents_posts .column`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      if (isActive) {
        css["box-shadow"] =
          configShadow.type +
          " " +
          configShadow.size +
          " " +
          configShadow.size +
          " " +
          configShadow.size +
          " " +
          color.rgbTxt;
      } else {
        css["box-shadow"] = "none";
      }
    }
    props.editor.Css.setRule(`#${attr.id} .recents_posts .column`, css);
    cmp.setAttributes(attr);
    props.editor.setStyle(props.editor.getCss());
  };
  const changeBackgroundCat = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-cat-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .category, #${attr.id}.${selectedItem} .post-module .category`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .category, #${attr.id}.${selectedItem} .post-module .category`,
      css
    );
    setConfigBgCat(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const changeBackgroundBtn = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;

    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .savoirplus,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus`,
      css
    );
    setConfigBgButton(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const changeBackgroundBtnCarousel = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btnar-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .owl-nav i`);
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;

    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .owl-nav i`, css);
    setconfigBgButtonCarousel(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeBackgroundIconCarousel = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-bticon-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .owl-nav i`);
    let css = [];
    if (r) css = r.attributes.style;
    css["color"] = e.rgbTxt;

    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .owl-nav i`, css);
    setconfigBgIconCarousel(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const changeBackgroundBtnHover = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-bgh"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .savoirplus:hover,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus:hover`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .post-module .post-content .savoirplus:hover,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus:hover`,
      css
    );
    setConfigBgButtonhover(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeBackgroundBtnHoverCarousel = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-bghca"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .owl-nav i:hover`);
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .owl-nav i:hover`, css);
    setConfigBgButtonhoverCarousel(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const changeBackgroundBtnTextHover = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-text-hover"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .post-module .post-content .savoirplus:hover,#${attr.id}.${selectedItem} .post-module .post-content .savoirplus:hover`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["color"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} [type=submit]:hover`, css);
    setConfigBgButtonTexthover(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeBgBtnTextHoverCarousel = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btnca-text-hover"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .owl-nav i:hover`);
    let css = [];
    if (r) css = r.attributes.style;
    css["color"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .owl-nav i:hover`, css);
    setConfigBtntexthoverCarousel(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const changeModel = (key) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let classes = cmp.getClasses().filter((x) => x.indexOf("Model") == -1);
    switch (key) {
      case "BlogModelOne":
        classes.push(key);
      case "BlogModelTwo":
        classes.push(key);

        break;
      default:
        key = "BlogModelOne";
        break;
    }

    cmp.setClass(classes);
    setSelectedItem(key);

    ////cmp.view.render();
  };

  const handleClose = () => {
    setShow(false);
    const cmp = props.editor.getSelected();

    cmp.view.render();
  };

  const changeParams = (type, value) => {
    let newParams = { ...params };
    newParams[type] = value;
    setParams(newParams);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-params"] = JSON.stringify(newParams);
    cmp.setAttributes(attr);
    cmp.view.render();
  };
  useEffect(() => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    setParams(JSON.parse(attr["data-params"]));
    let modelKey = cmp.getClasses().filter((x) => x.indexOf("Model") > -1)[0];

    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
    setSelectedItem(modelKey);
    if (attr["data-activeborder"] == "false") {
      changeModel(modelKey);
    }
    if (attr["data-activebordercat"] == "false") {
      changeModel(modelKey);
    }
    if (attr["data-activeborderdate"] == "false") {
      changeModel(modelKey);
    }
    if (attr["data-activeitemborder"] == "false") {
      changeModel(modelKey);
    }
  }, []);
  useEffect(() => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-activeborder"] = activeBorder;
    attr["data-activebordercat"] = activeBorderCat;
    attr["data-activeborderdate"] = activeBorderDate;
    attr["data-activeitemborder"] = activeBorderItemBlog;
    attr["data-activesizeinput"] = activeSizeInput;
    cmp.setAttributes(attr);
  }, [
    activeBorder,
    activeBorderCat,
    activeBorderDate,
    activeSizeInput,
    activeBorderItemBlog,
  ]);

  return (
    <div id="modalgallery">
      <Modal
        dialogAs={DraggableModalDialog}
        show={show}
        backdrop="static"
        onHide={handleClose}
        id="ModalFormulaire"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="handleDrag">
          <Modal.Title>
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link tt active"
                  id="nav-contenu-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contenu"
                  type="button"
                  role="tab"
                  aria-controls="nav-contenu"
                  aria-selected="true"
                >
                  Contenu
                </button>
                <button
                  className="nav-link tt"
                  id="nav-desgine-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-desgine"
                  type="button"
                  role="tab"
                  aria-controls="nav-desgine"
                  aria-selected="false"
                >
                  Desgin
                </button>
              </div>
            </nav>
          </Modal.Title>
          <div className="btns-action">
            <button
              type="button"
              className="btn-closes"
              aria-label="Close"
              onClick={handleClose}
            >
              {" "}
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-contenu"
              role="tabpanel"
              aria-labelledby="nav-contenu-tab"
              tabindex="0"
            >
              <span className="title-popups">
                Contenu des derniers articles
              </span>

              <div className="structmodals">
                <div class="mb-3 p-3">
                  <label class="article-label">Nombre de post à afficher</label>
                  <input
                    onChange={(e) => {
                      changeParams("nbr", e.target.value);
                    }}
                    type="number"
                    max={20}
                    min={3}
                    class="form-control"
                    value={params.nbr || 5}
                  />
                </div>
                <div class="mb-3 p-3">
                  <label class="article-label">Text du lien</label>
                  <input
                    onChange={(e) => {
                      changeParams("postBtnTxt", e.target.value);
                    }}
                    type="text"
                    class="form-control"
                    value={params.postBtnTxt || "En savoir plus"}
                  />
                </div>

                <div className="form-check form-switch mb-3 p-3">
                  <label className="form-check-label" htmlFor={`carrousel`}>
                    Slide
                  </label>
                  <input
                    onChange={(e) => {
                      changeParams("carrousel", e.target.checked.toString());
                    }}
                    checked={params.carrousel == "true"}
                    type="checkbox"
                    role="switch"
                    className="form-check-input"
                    id={"carrousel"}
                   
                  />
                </div>

                <div className="form-check form-switch mb-3 p-3">
                  <label className="form-check-label" htmlFor={`titlebtnplus`}>
                    Afficher le lien
                  </label>
                  <input
                    onChange={(e) => {
                      changeParams("postBtn", e.target.checked.toString());
                    }}
                    checked={params.postBtn == "true"}
                    type="checkbox"
                    role="switch"
                    className="form-check-input"
                    id={"titlebtnplus"}
                  />
                </div>
                <div className="form-check form-switch mb-3 p-3">
                  <label className="form-check-label" htmlFor={`imageblog`}>
                    Afficher l'image
                  </label>
                  <input
                    className="form-check-input"
                    checked={params.postThumb == "true"}
                    type="checkbox"
                    role="switch"
                    id={`imageblog`}
                    onChange={(e) =>
                      changeParams("postThumb", e.target.checked.toString())
                    }
                  />
                </div>

                <div class="form-check form-switch mb-3 p-3">
                  <label class="form-check-label" for={"catblog-" + article.id}>
                    Afficher catégorie du blog
                  </label>
                  <input
                    class="form-check-input"
                    checked={params.postCategory == "true"}
                    type="checkbox"
                    role="switch"
                    id={"catblog"}
                    onChange={(e) =>
                      changeParams("postCategory", e.target.checked.toString())
                    }
                  />
                </div>
                <div class="form-check form-switch mb-3 p-3">
                  <label class="form-check-label" for={"dateblog"}>
                    Afficher date
                  </label>
                  <input
                    class="form-check-input"
                    checked={params.postDate == "true"}
                    type="checkbox"
                    role="switch"
                    id={"dateblog"}
                    onChange={(e) =>
                      changeParams("postDate", e.target.checked.toString())
                    }
                  />
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-desgine"
              role="tabpanel"
              aria-labelledby="nav-desgine-tab"
              tabindex="0"
            >
              <span className="title-popups"> Design </span>

              <div
                data-bs-spy="scroll"
                data-bs-target="#navbar-example2"
                data-bs-root-margin="0px 0px -40%"
                data-bs-smooth-scroll="true"
                class="scrollspy-example bg-light  rounded-2"
                tabindex="0"
              >
                <>
                  {params.carrousel == "false" ? (
                    <div className="firstdiv">
                      <span className="titre mt-4 mb-4 ">Mise en page </span>
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        <div className="panelContnet">
                          <div className="btn-group dropend">
                            <img
                              src={
                                selectedItem === "BlogModelOne"
                                  ? BlogModelOne
                                  : BlogModelTwo
                              }
                              className="img imgReseau  ms-3 me-3 rounded-0 "
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            />
                            <i
                              className="dropdown-toggle m-3"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            ></i>
                            <ul className="dropdown-menu preview-options pt-3 pb-3">
                              <span class="titredropdown m-3">
                                Sélectionner la mise en page
                              </span>
                              <div
                                onClick={(e) => changeModel("BlogModelOne")}
                                className={
                                  selectedItem === "BlogModelOne"
                                    ? "selecterd mb-3 imgstype"
                                    : "mb-3 imgstype"
                                }
                              >
                                <img src={BlogModelOne} alt={BlogModelOne} />
                              </div>
                              <div
                                onClick={(e) => changeModel("BlogModelTwo")}
                                className={
                                  selectedItem === "BlogModelTwo"
                                    ? "selecterd mb-3 imgstype"
                                    : "mb-3 imgstype"
                                }
                              >
                                <img src={BlogModelTwo} alt={BlogModelTwo} />
                              </div>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>

                <div className="scrolly">
                  <div className="firstdivplus">
                    <span className="titre  mt-4 mb-4">Style</span>
                    <div class="accordion" id="accordionExample">
                      <div class="accordion-item" id="scrollspyHeadingfirst">
                        <h2 class="accordion-header" id="headingfirst">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsefirst"
                            aria-expanded="true"
                            aria-controls="collapsefirst"
                          >
                            Design Item blog
                          </button>
                        </h2>
                        <div
                          id="collapsefirst"
                          class="accordion-collapse collapse"
                          aria-labelledby="headingfirst"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <ul
                              class="nav nav-tabs mt-3 mb-3"
                              id="pills-tab"
                              role="tablist"
                            >
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link active"
                                  id="pills-styleitem-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-styleitem"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-styleitem"
                                  aria-selected="true"
                                >
                                  Style
                                </button>
                              </li>

                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-es-item-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-es-item"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-es-item"
                                  aria-selected="false"
                                >
                                  Espacement
                                </button>
                              </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                              <div
                                class="tab-pane fade show active"
                                id="pills-styleitem"
                                role="tabpanel"
                                aria-labelledby="pills-styleitem-tab"
                              >
                                <div class="form-check article-switch mb-3 p-2">
                                  <label
                                    class="form-check-label"
                                    for={activeBorderItemBlog}
                                  >
                                    Activer border
                                  </label>
                                  <input
                                    class="form-check-input"
                                    checked={activeBorderItemBlog == "true"}
                                    type="checkbox"
                                    role="switch"
                                    onChange={(e) =>
                                      setActiveBorderItemBlog(
                                        e.target.checked.toString()
                                      )
                                    }
                                  />
                                </div>
                                {activeBorderItemBlog == "true" ? (
                                  <div className="mt-3 mb-3">
                                    <BorderConfig
                                      key={"ItemBlog"}
                                      for={"ItemBlog"}
                                      editor={props.editor}
                                      siteId={props.siteId}
                                      config={configBorderItemBlog}
                                      setConfig={changeBorderItemBlog}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arrondis en px
                                  </div>
                                  <ArrondisConfig
                                    key={"radiuisItemBlog"}
                                    for={"radiuisItemBlog"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configRdItemBlog}
                                    setConfig={changeRaduisItemBlog}
                                  />
                                </div>
                                <OmbreConfig
                                  title="Ombre du boutton"
                                  config={{
                                    isActiveOmbre: isActiveOmbre,
                                    shadow: shadow,
                                    OmbrePickerColor: OmbrePickerColor,
                                  }}
                                  setConfig={setOmbreConfig}
                                />
                              </div>

                              <div
                                class="tab-pane fade"
                                id="pills-es-item"
                                role="tabpanel"
                                aria-labelledby="pills-es-item-tab"
                              >
                                <EspacementConfig
                                  key={"espacementItemBlog"}
                                  for={"espacementItemBlog"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configEspacementItemBlog}
                                  setConfig={changeEspacementItemBlog}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="accordion-item" id="scrollspyHeading2">
                        <h2 class="accordion-header" id="headingTow">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTow"
                            aria-expanded="true"
                            aria-controls="collapseTow"
                          >
                            Design titre
                          </button>
                        </h2>
                        <div
                          id="collapseTow"
                          class="accordion-collapse collapse show"
                          aria-labelledby="headingTow"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <ul
                              class="nav nav-tabs mt-3 mb-3"
                              id="pills-tab"
                              role="tablist"
                            >
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link active"
                                  id="pills-champs-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-champs"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-champs"
                                  aria-selected="true"
                                >
                                  Style
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-text-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-text"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-text"
                                  aria-selected="false"
                                >
                                  Text
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-text-es-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-es-text"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-es-text"
                                  aria-selected="false"
                                >
                                  Espacement
                                </button>
                              </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                              <div
                                class="tab-pane fade show active"
                                id="pills-champs"
                                role="tabpanel"
                                aria-labelledby="pills-champs-tab"
                              >
                                <div class="form-check article-switch mb-3 p-2">
                                  <label
                                    class="form-check-label"
                                    for={activeBorder}
                                  >
                                    Activer border
                                  </label>
                                  <input
                                    class="form-check-input"
                                    checked={activeBorder == "true"}
                                    type="checkbox"
                                    role="switch"
                                    onChange={(e) =>
                                      setActiveBorder(
                                        e.target.checked.toString()
                                      )
                                    }
                                  />
                                </div>
                                {activeBorder == "true" ? (
                                  <div className="mt-3 mb-3">
                                    <BorderConfig
                                      key={"titleblog"}
                                      for={"titleblog"}
                                      editor={props.editor}
                                      siteId={props.siteId}
                                      config={configBorder}
                                      setConfig={changeBorder}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arrondis en px
                                  </div>
                                  <ArrondisConfig
                                    key={"radiuistitle"}
                                    for={"radiuistitle"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configRdTitle}
                                    setConfig={changeRaduisTitle}
                                  />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arriére du champ
                                  </div>
                                  <ColorConfig
                                    key={"bgtitle"}
                                    for={"bgtitle"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgTitle}
                                    setConfig={changeBackgroundTitle}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="pills-text"
                                role="tabpanel"
                                aria-labelledby="pills-text-tab"
                              >
                                <div className="mt-3 mb-3">
                                  <TextStylingComponent
                                    key={"typotitle"}
                                    for={"typotitle"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={ConfigSizeTitle}
                                    setConfig={changeTypoTitleConfig}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="pills-es-text"
                                role="tabpanel"
                                aria-labelledby="pills-es-text-tab"
                              >
                                <EspacementConfig
                                  key={"espacementtitle"}
                                  for={"espacementtitle"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configEspacementTitle}
                                  setConfig={changeEspacementTitle}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item" id="scrollspyHeading3">
                        <h2 class="accordion-header" id="headingThree">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="true"
                            aria-controls="collapseThree"
                          >
                            Design catégorie
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          class="accordion-collapse collapse "
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <ul
                              class="nav nav-tabs mt-3 mb-3"
                              id="pills-tab"
                              role="tablist"
                            >
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link active"
                                  id="pills-stcat-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-stcat"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-stcat"
                                  aria-selected="true"
                                >
                                  Style
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-cat-text-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-cat-text"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-cat-text"
                                  aria-selected="false"
                                >
                                  Text
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-es-cat-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-es-cat"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-es-cat"
                                  aria-selected="false"
                                >
                                  Espacement
                                </button>
                              </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                              <div
                                class="tab-pane fade show active"
                                id="pills-stcat"
                                role="tabpanel"
                                aria-labelledby="pills-stcat-tab"
                              >
                                <div class="form-check article-switch mb-3 p-2">
                                  <label
                                    class="form-check-label"
                                    for={activeBorderCat}
                                  >
                                    Activer border
                                  </label>
                                  <input
                                    class="form-check-input"
                                    checked={activeBorderCat == "true"}
                                    type="checkbox"
                                    role="switch"
                                    onChange={(e) =>
                                      setActiveBorderCat(
                                        e.target.checked.toString()
                                      )
                                    }
                                  />
                                </div>
                                {activeBorderCat == "true" ? (
                                  <div className="mt-3 mb-3">
                                    <BorderConfig
                                      key={"catborder"}
                                      for={"catborder"}
                                      editor={props.editor}
                                      siteId={props.siteId}
                                      config={configBorderCat}
                                      setConfig={changeBorderCat}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arrondis en px
                                  </div>
                                  <ArrondisConfig
                                    key={"rdCat"}
                                    for={"rdCat"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configRdCat}
                                    setConfig={changeRaduisCat}
                                  />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arriére du champ
                                  </div>
                                  <ColorConfig
                                    key={"bgCat"}
                                    for={"bgCat"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgCat}
                                    setConfig={changeBackgroundCat}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="pills-cat-text"
                                role="tabpanel"
                                aria-labelledby="pills-cat-text-tab"
                              >
                                <div className="mt-3 mb-3">
                                  <TextStylingComponent
                                    key={"textcat"}
                                    for={"textcat"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configTextCat}
                                    setConfig={changeTextCatConfig}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="pills-es-cat"
                                role="tabpanel"
                                aria-labelledby="pills-es-cat-tab"
                              >
                                <EspacementConfig
                                  key={"escat"}
                                  for={"escat"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configEspacementCat}
                                  setConfig={changeEspacementCat}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item" id="scrollspyHeading4">
                        <h2 class="accordion-header" id="headingFour">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                            aria-expanded="true"
                            aria-controls="collapseFour"
                          >
                            Design description
                          </button>
                        </h2>
                        <div
                          id="collapseFour"
                          class="accordion-collapse collapse "
                          aria-labelledby="headingFour"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <ul
                              class="nav nav-tabs mt-3 mb-3"
                              id="pills-tab"
                              role="tablist"
                            >
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link active"
                                  id="pills-stdesc-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-stdesc"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-stdesc"
                                  aria-selected="true"
                                >
                                  Style
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-desc-text-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-desc-text"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-desc-text"
                                  aria-selected="false"
                                >
                                  Text
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-es-desc-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-es-desc"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-es-desc"
                                  aria-selected="false"
                                >
                                  Espacement
                                </button>
                              </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                              <div
                                class="tab-pane fade show active"
                                id="pills-stdesc"
                                role="tabpanel"
                                aria-labelledby="pills-stdesc-tab"
                              >
                                <div class="form-check article-switch mb-3 p-2">
                                  <label
                                    class="form-check-label"
                                    for={activeBorderDate}
                                  >
                                    Activer border
                                  </label>
                                  <input
                                    class="form-check-input"
                                    checked={activeBorderDate == "true"}
                                    type="checkbox"
                                    role="switch"
                                    onChange={(e) =>
                                      setActiveBorderDate(
                                        e.target.checked.toString()
                                      )
                                    }
                                  />
                                </div>
                                {activeBorderDate == "true" ? (
                                  <div className="mt-3 mb-3">
                                    <BorderConfig
                                      key={"descborder"}
                                      for={"descborder"}
                                      editor={props.editor}
                                      siteId={props.siteId}
                                      config={configBorderDesc}
                                      setConfig={changeBorderDesc}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arrondis en px
                                  </div>
                                  <ArrondisConfig
                                    key={"rddesc"}
                                    for={"rddesc"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configRdDesc}
                                    setConfig={changeRaduisDesc}
                                  />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arriére du champ
                                  </div>
                                  <ColorConfig
                                    key={"bgdesc"}
                                    for={"bgdesc"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgDesc}
                                    setConfig={changeBackgroundDesc}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="pills-desc-text"
                                role="tabpanel"
                                aria-labelledby="pills-desc-text-tab"
                              >
                                <div className="mt-3 mb-3">
                                  <TextStylingComponent
                                    key={"textdesc"}
                                    for={"textdesc"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configTextDesc}
                                    setConfig={changeTextDescConfig}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="pills-es-desc"
                                role="tabpanel"
                                aria-labelledby="pills-es-desc-tab"
                              >
                                <EspacementConfig
                                  key={"esdesc"}
                                  for={"esdesc"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configEspacementDesc}
                                  setConfig={changeEspacementDesc}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item" id="scrollspyHeading5">
                        <h2 class="accordion-header" id="headingFive">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFive"
                            aria-expanded="true"
                            aria-controls="collapseFive"
                          >
                            Design date
                          </button>
                        </h2>
                        <div
                          id="collapseFive"
                          class="accordion-collapse collapse "
                          aria-labelledby="headingFive"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <ul
                              class="nav nav-tabs mt-3 mb-3"
                              id="pills-tab"
                              role="tablist"
                            >
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link active"
                                  id="pills-date-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-date"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-date"
                                  aria-selected="true"
                                >
                                  Style
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-date-text-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-date-text"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-date-text"
                                  aria-selected="false"
                                >
                                  Text
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-es-date-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-es-date"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-es-date"
                                  aria-selected="false"
                                >
                                  Espacement
                                </button>
                              </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                              <div
                                class="tab-pane fade show active"
                                id="pills-date"
                                role="tabpanel"
                                aria-labelledby="pills-date-tab"
                              >
                                <div class="form-check article-switch mb-3 p-2">
                                  <label
                                    class="form-check-label"
                                    for={activeBorder}
                                  >
                                    Activer border
                                  </label>
                                  <input
                                    class="form-check-input"
                                    checked={activeBorder == "true"}
                                    type="checkbox"
                                    role="switch"
                                    onChange={(e) =>
                                      setActiveBorder(
                                        e.target.checked.toString()
                                      )
                                    }
                                  />
                                </div>
                                {activeBorder == "true" ? (
                                  <div className="mt-3 mb-3">
                                    <BorderConfig
                                      key={"datecborder"}
                                      for={"dateborder"}
                                      editor={props.editor}
                                      siteId={props.siteId}
                                      config={configBorderDate}
                                      setConfig={changeBorderDate}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arrondis en px
                                  </div>
                                  <ArrondisConfig
                                    key={"rddate"}
                                    for={"rddate"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configRdDate}
                                    setConfig={changeRaduisDate}
                                  />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arriére du champ
                                  </div>
                                  <ColorConfig
                                    key={"bgdate"}
                                    for={"bgdate"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgDate}
                                    setConfig={changeBackgroundDate}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="pills-date-text"
                                role="tabpanel"
                                aria-labelledby="pills-date-text-tab"
                              >
                                <div className="mt-3 mb-3">
                                  <TextStylingComponent
                                    key={"textdate"}
                                    for={"textdate"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configTextDate}
                                    setConfig={changeTextDateConfig}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="pills-es-date"
                                role="tabpanel"
                                aria-labelledby="pills-es-date-tab"
                              >
                                <EspacementConfig
                                  key={"esdate"}
                                  for={"esdate"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configEspacementDate}
                                  setConfig={changeEspacementDate}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item" id="scrollspyHeading6">
                        <h2 class="accordion-header" id="headingsex">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsesex"
                            aria-expanded="true"
                            aria-controls="collapsesex"
                          >
                            Design du buttons savoir plus
                          </button>
                        </h2>
                        <div
                          id="collapsesex"
                          class="accordion-collapse collapse"
                          aria-labelledby="headingsex"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <ul
                              class="nav nav-tabs mt-3 mb-3"
                              id="myTab"
                              role="tablist"
                            >
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link active"
                                  id="Stylelien-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#Stylelien-tab-pane"
                                  type="button"
                                  role="tab"
                                  aria-controls="Stylelien"
                                  aria-selected="true"
                                >
                                  Design
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="textlien-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#textlien-tab-pane"
                                  type="button"
                                  role="tab"
                                  aria-controls="textlien"
                                  aria-selected="false"
                                >
                                  Texte
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="hoverbtn-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#hoverbtn-tab-pane"
                                  type="button"
                                  role="tab"
                                  aria-controls="hoverbtn"
                                  aria-selected="false"
                                >
                                  Survol
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="textlienes-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#textlienes-tab-pane"
                                  type="button"
                                  role="tab"
                                  aria-controls="textlienes"
                                  aria-selected="false"
                                >
                                  Espacement
                                </button>
                              </li>
                            </ul>
                            <div class="tab-content " id="myTabContent">
                              <div
                                class="tab-pane fade show active"
                                id="Stylelien-tab-pane"
                                role="tabpanel"
                                aria-labelledby="Stylelien-tab"
                                tabindex="0"
                              >
                                <BorderConfig
                                  key={"savoirplus"}
                                  for={"savoirplus"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configBorderButton}
                                  setConfig={changeBorderButton}
                                />
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arriére du button
                                  </div>
                                  <ColorConfig
                                    key={"colorsavoirplus"}
                                    for={"colorsavoirplus"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgButton}
                                    setConfig={changeBackgroundBtn}
                                  />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">Arrondis</div>
                                  <ArrondisConfig
                                    key={"savoirplusrd"}
                                    for={"savoirplusrd"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configRdButton}
                                    setConfig={changeRaduisButton}
                                  />
                                </div>
                                <div className="d-flex justify-content-between align-items-center  mb-3">
                                  <div className="blockTitle m-2">Largeur</div>

                                  <div className="d-flex justify-content-between align-items-center">
                                    <i class="fas fa-desktop me-1"></i>
                                    <div class="input-with-label-pixel me-2">
                                      <span class="pixel-label">px</span>
                                      <input
                                        min="10"
                                        max="1200"
                                        class="form-control form-control-sm input-small-pixel"
                                        type="number"
                                        value={sizeBtn.desktop}
                                        onChange={(e) =>
                                          changeSize("desktop", e.target.value)
                                        }
                                      />
                                    </div>
                                    <i class="fas fa-tablet me-1"></i>
                                    <div class="input-with-label-pixel me-2">
                                      <span class="pixel-label">px</span>
                                      <input
                                        min="10"
                                        max="1200"
                                        class="form-control form-control-sm input-small-pixel"
                                        type="number"
                                        value={sizeBtn.tablet}
                                        onChange={(e) =>
                                          changeSize("tablet", e.target.value)
                                        }
                                      />
                                    </div>
                                    <i class="fas fa-tablet me-1"></i>
                                    <div class="input-with-label-pixel me-2">
                                      <span class="pixel-label">px</span>
                                      <input
                                        min="10"
                                        max="1200"
                                        class="form-control form-control-sm input-small-pixel"
                                        type="number"
                                        value={sizeBtn.mobile}
                                        onChange={(e) =>
                                          changeSize("mobile", e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                  <div className="panelTitle m-2">
                                    Orientation du button
                                  </div>
                                  <div className="panelContnet d-flex align-items-center">
                                    <div className="radio-btns-group">
                                      <input
                                        type="radio"
                                        name="start"
                                        id="start"
                                        checked={posAlignBtn.align == "start"}
                                        value="start"
                                        className="RadioInput"
                                        onChange={(e) =>
                                          changePostionBtn(e.target.value)
                                        }
                                      />
                                      <label
                                        htmlFor="start"
                                        className="RadioLabel"
                                      >
                                        <i class="fa-solid fa-arrow-left"></i>
                                      </label>
                                      <input
                                        type="radio"
                                        name="center"
                                        id="center"
                                        checked={posAlignBtn.align == "center"}
                                        value="center"
                                        className="RadioInput"
                                        onChange={(e) =>
                                          changePostionBtn(e.target.value)
                                        }
                                      />
                                      <label
                                        htmlFor="center"
                                        className="RadioLabel"
                                      >
                                        <i class="fa-solid fa-arrow-up"></i>
                                      </label>
                                      <input
                                        type="radio"
                                        name="end"
                                        id="end"
                                        checked={posAlignBtn.align == "end"}
                                        value="end"
                                        className="RadioInput"
                                        onChange={(e) =>
                                          changePostionBtn(e.target.value)
                                        }
                                      />
                                      <label
                                        htmlFor="end"
                                        className="RadioLabel"
                                      >
                                        <i class="fa-solid fa-arrow-right"></i>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="tab-pane fade "
                                id="hoverbtn-tab-pane"
                                role="tabpanel"
                                aria-labelledby="hoverbtn-tab"
                                tabindex="0"
                              >
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Survol du button
                                  </div>
                                  <ColorConfig
                                    key={"btnhover"}
                                    for={"btnhover"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgButtonhover}
                                    setConfig={changeBackgroundBtnHover}
                                  />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Survol du texte
                                  </div>
                                  <ColorConfig
                                    key={"btntexthover"}
                                    for={"btntexthover"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgButtontexthover}
                                    setConfig={changeBackgroundBtnTextHover}
                                  />
                                </div>
                                <BorderConfig
                                  key={"savoirplushover"}
                                  for={"savoirplushover"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configBorderButtonHover}
                                  setConfig={changeBorderButtonHover}
                                />
                              </div>
                              <div
                                class="tab-pane fade "
                                id="textlien-tab-pane"
                                role="tabpanel"
                                aria-labelledby="textlien-tab"
                                tabindex="0"
                              >
                                <TextStylingComponent
                                  key={"textesubmit"}
                                  for={"textesubmit"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={ConfigsizeTextBtn}
                                  setConfig={changetextBtnConfig}
                                />
                              </div>
                              <div
                                class="tab-pane fade "
                                id="textlienes-tab-pane"
                                role="tabpanel"
                                aria-labelledby="textlienes-tab"
                                tabindex="0"
                              >
                                <EspacementConfig
                                  key={"essubmit"}
                                  for={"essubmit"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configEspacementBtn}
                                  setConfig={changeEspacementBtn}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {params.carrousel == "true" ? (
                        <div class="accordion-item" id="scrollspyHeading7">
                          <h2 class="accordion-header" id="headingseven">
                            <button
                              class="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseseven"
                              aria-expanded="true"
                              aria-controls="collapseseven"
                            >
                              Design du buttons carousel
                            </button>
                          </h2>
                          <div
                            id="collapseseven"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingseven"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <ul
                                class="nav nav-tabs mt-3 mb-3"
                                id="myTab"
                                role="tablist"
                              >
                                <li class="nav-item" role="presentation">
                                  <button
                                    class="nav-link active"
                                    id="Stylear-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#Stylear-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="Stylear"
                                    aria-selected="true"
                                  >
                                    Design
                                  </button>
                                </li>

                                <li class="nav-item" role="presentation">
                                  <button
                                    class="nav-link"
                                    id="hoverbtnar-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#hoverbtnar-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="hoverbtnar"
                                    aria-selected="false"
                                  >
                                    Survol
                                  </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                  <button
                                    class="nav-link"
                                    id="espacementar-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#espacementar-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="espacementar"
                                    aria-selected="false"
                                  >
                                    Espacement
                                  </button>
                                </li>
                              </ul>
                              <div class="tab-content " id="myTabContent">
                                <div
                                  class="tab-pane fade show active"
                                  id="Stylear-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="Stylear-tab"
                                  tabindex="0"
                                >
                                  <BorderConfig
                                    key={"pluscarousel"}
                                    for={"pluscarousel"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBorderButtonCarousel}
                                    setConfig={changeBorderButtonCarousel}
                                  />
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="blockTitle m-2">
                                      Arriére du button
                                    </div>
                                    <ColorConfig
                                      key={"colorcarousel"}
                                      for={"colorcarousel"}
                                      editor={props.editor}
                                      siteId={props.siteId}
                                      config={configBgButtonCarousel}
                                      setConfig={changeBackgroundBtnCarousel}
                                    />
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="blockTitle m-2">
                                      Couleur du button
                                    </div>
                                    <ColorConfig
                                      key={"coloriconcarousel"}
                                      for={"coloriconcarousel"}
                                      editor={props.editor}
                                      siteId={props.siteId}
                                      config={configBgIconCarousel}
                                      setConfig={changeBackgroundIconCarousel}
                                    />
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="blockTitle m-2">
                                      Arrondis
                                    </div>
                                    <ArrondisConfig
                                      key={"carouselrd"}
                                      for={"carouselrd"}
                                      editor={props.editor}
                                      siteId={props.siteId}
                                      config={configRdButtonCarousel}
                                      setConfig={changeRaduisButtonCarousel}
                                    />
                                  </div>
                                  {/* <div className="d-flex justify-content-between align-items-center  mb-3">
                                  <div className="blockTitle m-2">Largeur</div>

                                  <div className="d-flex justify-content-between align-items-center">
                                    <i class="fas fa-desktop me-1"></i>
                                    <div class="input-with-label-pixel me-2">
                                      <span class="pixel-label">px</span>
                                      <input
                                        min="10"
                                        max="1200"
                                        class="form-control form-control-sm input-small-pixel"
                                        type="number"
                                        value={sizeBtnCarousel.desktop}
                                        onChange={(e) =>
                                          changesizeBtnCarousel(
                                            "desktop",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <i class="fas fa-tablet me-1"></i>
                                    <div class="input-with-label-pixel me-2">
                                      <span class="pixel-label">px</span>
                                      <input
                                        min="10"
                                        max="1200"
                                        class="form-control form-control-sm input-small-pixel"
                                        type="number"
                                        value={sizeBtnCarousel.tablet}
                                        onChange={(e) =>
                                          changesizeBtnCarousel(
                                            "tablet",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <i class="fas fa-tablet me-1"></i>
                                    <div class="input-with-label-pixel me-2">
                                      <span class="pixel-label">px</span>
                                      <input
                                        min="10"
                                        max="1200"
                                        class="form-control form-control-sm input-small-pixel"
                                        type="number"
                                        value={sizeBtnCarousel.mobile}
                                        onChange={(e) =>
                                          changesizeBtnCarousel(
                                            "mobile",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div> */}

                                  <div className="d-flex justify-content-between align-items-center  mb-3">
                                    <div className="blockTitle m-2">
                                      Taille du l'icon
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                      <i class="fas fa-desktop me-1"></i>
                                      <div class="input-with-label-pixel me-2">
                                        <span class="pixel-label">px</span>
                                        <input
                                          min="10"
                                          max="1200"
                                          class="form-control form-control-sm input-small-pixel"
                                          type="number"
                                          value={sizeIconCarousel.desktop}
                                          onChange={(e) =>
                                            changesizeIconCarousel(
                                              "desktop",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <i class="fas fa-tablet me-1"></i>
                                      <div class="input-with-label-pixel me-2">
                                        <span class="pixel-label">px</span>
                                        <input
                                          min="10"
                                          max="1200"
                                          class="form-control form-control-sm input-small-pixel"
                                          type="number"
                                          value={sizeIconCarousel.tablet}
                                          onChange={(e) =>
                                            changesizeIconCarousel(
                                              "tablet",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <i class="fas fa-tablet me-1"></i>
                                      <div class="input-with-label-pixel me-2">
                                        <span class="pixel-label">px</span>
                                        <input
                                          min="10"
                                          max="1200"
                                          class="form-control form-control-sm input-small-pixel"
                                          type="number"
                                          value={sizeBtnCarousel.mobile}
                                          onChange={(e) =>
                                            changesizeIconCarousel(
                                              "mobile",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="panelTitle m-2">
                                      Orientation du button
                                    </div>
                                    <div className="panelContnet d-flex align-items-center">
                                      <div className="radio-btns-group">
                                        <input
                                          type="radio"
                                          name={"start-" + props.for}
                                          id={"start-" + props.for}
                                          checked={
                                            posAlignBtnCarousel.align == "start"
                                          }
                                          value="start"
                                          className="RadioInput"
                                          onChange={(e) =>
                                            changePostionBtnCarousel(
                                              e.target.value
                                            )
                                          }
                                        />
                                        <label
                                          htmlFor={"start-" + props.for}
                                          className="RadioLabel"
                                        >
                                          <i class="fa-solid fa-arrow-left"></i>
                                        </label>
                                        <input
                                          type="radio"
                                          name={"center-" + props.for}
                                          id={"center-" + props.for}
                                          checked={
                                            posAlignBtnCarousel.align ==
                                            "center"
                                          }
                                          value="center"
                                          className="RadioInput"
                                          onChange={(e) =>
                                            changePostionBtnCarousel(
                                              e.target.value
                                            )
                                          }
                                        />
                                        <label
                                          htmlFor={"center-" + props.for}
                                          className="RadioLabel"
                                        >
                                          <i class="fa-solid fa-arrow-up"></i>
                                        </label>
                                        <input
                                          type="radio"
                                          name={"end-" + props.for}
                                          id={"end-" + props.for}
                                          checked={
                                            posAlignBtnCarousel.align == "end"
                                          }
                                          value="end"
                                          className="RadioInput"
                                          onChange={(e) =>
                                            changePostionBtnCarousel(
                                              e.target.value
                                            )
                                          }
                                        />
                                        <label
                                          htmlFor={"end-" + props.for}
                                          className="RadioLabel"
                                        >
                                          <i class="fa-solid fa-arrow-right"></i>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  class="tab-pane fade "
                                  id="hoverbtnar-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="hoverbtnar-tab"
                                  tabindex="0"
                                >
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="blockTitle m-2">
                                      Survol du button
                                    </div>
                                    <ColorConfig
                                      key={"btncarouselehover"}
                                      for={"btncarouselhover"}
                                      editor={props.editor}
                                      siteId={props.siteId}
                                      config={configBgButtonhoverCarousel}
                                      setConfig={
                                        changeBackgroundBtnHoverCarousel
                                      }
                                    />
                                  </div>

                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="blockTitle m-2">
                                      Survol du texte
                                    </div>
                                    <ColorConfig
                                      key={"btntextcarouselhover"}
                                      for={"btntextcarouselhover"}
                                      editor={props.editor}
                                      siteId={props.siteId}
                                      config={configBtntexthoverCarousel}
                                      setConfig={changeBgBtnTextHoverCarousel}
                                    />
                                  </div>
                                  <BorderConfig
                                    key={"btnacathover"}
                                    for={"btnacathover"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBorderBtnHoverCarousel}
                                    setConfig={changeBorderBtnHoverCarousel}
                                  />
                                </div>

                                <div
                                  class="tab-pane fade "
                                  id="espacementar-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="espacementar-tab"
                                  tabindex="0"
                                >
                                  <EspacementConfig
                                    key={"essubmitcarousel"}
                                    for={"essubmitcarousel"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configEspacementBtnCarousel}
                                    setConfig={changeEspacementBtnCarousel}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div class="accordion-item" id="scrollspyHeading8">
                        <h2 class="accordion-header" id="headingeight">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseeight"
                            aria-expanded="true"
                            aria-controls="collapseeight"
                          >
                            Design images
                          </button>
                        </h2>
                        <div
                          id="collapseeight"
                          class="accordion-collapse collapse"
                          aria-labelledby="headingeight"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="panelTitle  ">Taille du image </div>
                            <input
                              type="range"
                              min="0"
                              max="1000"
                              step="1"
                              className="rangeInput me-2"
                              value={SizeImg.size}
                              onChange={(e) => changeSizeImg(e.target.value)}
                            />
                            <div className="input-with-label-pixel">
                              <span className="pixel-label"> px</span>
                              <input
                                min="0"
                                max="1000"
                                className="form-control form-control-sm input-small-pixel"
                                type="number"
                                value={SizeImg.size}
                                onChange={(e) => changeSizeImg(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
