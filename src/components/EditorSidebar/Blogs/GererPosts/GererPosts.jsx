import React, { useEffect, useState } from "react";
import imgSite from "../../../../assets/imgSites/imgSite.svg";
import iconVoir from "../../../../assets/imgSites/iconVoir.svg";
import iconEdit from "../../../../assets/imgSites/iconEdit.svg";
// import iconClose from "../../../../assets/imgEditorSidebar/iconClose.png";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import fallbackImage from "../../../../assets/MediaLibrary/UploadFile.svg"; // Import image to avoid path issues

import "./GererPosts.css";
import EditInfoPosts from "../EditInfoPosts/EditInfoPosts";
import Creatable, { useCreatable } from "react-select/creatable";

import GererCategorie from "../GererCategorie/GererCategorie";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fromBlob } from "image-resize-compress";

export default function GererPosts(props) {
  const [categ, setCateg] = useState(props.data);

  const navigate = useNavigate();
  let { siteId, pageId, type } = useParams();
  const [CategorieList, setCategorieList] = useState([]);
  const [post, setPost] = useState({
    title: "",
    resume: "",
    SiteSchema: siteId,
    categorie: props.data._id,
    meta_title: "",
    meta_description: "",
    thumbnail: "https://api-ysbuilder.b-forbiz.com/assets/empty-img.png",
    date_creation: Date.now,
    content: {
      html: `<article draggable="true" id="i2uup"><div ref="Section-825d0188-6ee3-4094-bdbf-cbebcb21289a" id="row-30481b69-36f5-45d0-8d2f-257df195b5d8" data-auto="true" data-dot="false" data-nav="true" data-colordots="#000000" data-colordotshover="#000000" data-next="<i class=&quot;fa-solid fa-circle-chevron-right&quot;></i>" data-prev="<i class=&quot;fa-solid fa-circle-chevron-left&quot;></i>" data-margin="20" draggable="true" data-nb_desktop="4" data-nb_tablette="2" data-nb_mobile="1" conteneur="YES" class="gjs-row gjs-selected container mx-auto"> <div draggable="true" id="i33upv" class="gjs-cell"> <p id="i9uwp6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <br/>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p> </div> </div> <div ref="Section-825d0188-6ee3-4094-bdbf-cbebcb21289a" id="row-30481b69-36f5-45d0-8d2f-257df195b5d8-3" data-auto="true" data-dot="false" data-nav="true" data-colordots="#000000" data-colordotshover="#000000" data-next="<i class=&quot;fa-solid fa-circle-chevron-right&quot;></i>" data-prev="<i class=&quot;fa-solid fa-circle-chevron-left&quot;></i>" data-margin="20" draggable="true" data-nb_desktop="4" data-nb_tablette="2" data-nb_mobile="1" conteneur="YES" class="gjs-row gjs-selected container mx-auto"> <div draggable="true" id="i4ugaj" class="gjs-cell"> <img draggable="true" src="https://builder.bforbiz-dev.com/assets/empty-img.png" alt="" data-padding="{&quot;top&quot;:&quot;15&quot;,&quot;left&quot;:&quot;15&quot;,&quot;right&quot;:&quot;15&quot;,&quot;bottom&quot;:&quot;15&quot;}" data-margin="{&quot;top&quot;:&quot;0&quot;,&quot;left&quot;:&quot;0&quot;,&quot;right&quot;:&quot;0&quot;,&quot;bottom&quot;:&quot;0&quot;}" data-style-image="" data-width="true" data-image-width="{&quot;desktop&quot;:&quot;200px&quot;,&quot;tablet&quot;:&quot;200px&quot;,&quot;mobile&quot;:&quot;200px&quot;}" data-border-type="all" data-border-size="0" data-border-style="solid" data-border-color="#000" data-ombre="false" data-ombre-color="#000" data-ombre-size="0" data-ombre-type="" data-aos="" id="ignzst" class="gjs-img img"/> </div> <div draggable="true" id="iqkshg" class="gjs-cell"> <p id="ii1f56">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <br/>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p> </div> </div> <div ref="Section-825d0188-6ee3-4094-bdbf-cbebcb21289a" id="row-30481b69-36f5-45d0-8d2f-257df195b5d8-2" data-auto="true" data-dot="false" data-nav="true" data-colordots="#000000" data-colordotshover="#000000" data-next="<i class=&quot;fa-solid fa-circle-chevron-right&quot;></i>" data-prev="<i class=&quot;fa-solid fa-circle-chevron-left&quot;></i>" data-margin="20" draggable="true" data-nb_desktop="4" data-nb_tablette="2" data-nb_mobile="1" conteneur="YES" class="gjs-row gjs-selected container mx-auto"> <div draggable="true" id="ihhp7i" class="gjs-cell"> <p id="i44lf2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <br/>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p> </div> <div draggable="true" id="iv3p2h" class="gjs-cell"> <img draggable="true" src="https://builder.bforbiz-dev.com/assets/empty-img.png" alt="" data-padding="{&quot;top&quot;:&quot;15&quot;,&quot;left&quot;:&quot;15&quot;,&quot;right&quot;:&quot;15&quot;,&quot;bottom&quot;:&quot;15&quot;}" data-margin="{&quot;top&quot;:&quot;0&quot;,&quot;left&quot;:&quot;0&quot;,&quot;right&quot;:&quot;0&quot;,&quot;bottom&quot;:&quot;0&quot;}" data-style-image="" data-width="true" data-image-width="{&quot;desktop&quot;:&quot;200px&quot;,&quot;tablet&quot;:&quot;200px&quot;,&quot;mobile&quot;:&quot;200px&quot;}" data-border-type="all" data-border-size="0" data-border-style="solid" data-border-color="#000" data-ombre="false" data-ombre-color="#000" data-ombre-size="0" data-ombre-type="" data-aos="" id="iyr21k" class="gjs-img img"/> </div> </div> <div ref="Section-825d0188-6ee3-4094-bdbf-cbebcb21289a" id="row-0ac6f230-8501-442a-8ad9-c57a033bf494" data-auto="true" data-dot="false" data-nav="true" data-colordots="#000000" data-colordotshover="#000000" data-next="<i class=&quot;fa-solid fa-circle-chevron-right&quot;></i>" data-prev="<i class=&quot;fa-solid fa-circle-chevron-left&quot;></i>" data-margin="20" draggable="true" data-nb_desktop="4" data-nb_tablette="2" data-nb_mobile="1" conteneur="YES" class="gjs-row gjs-selected container mx-auto"> <div draggable="true" class="gjs-cell"> <p id="i8z61z">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <br/>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p> </div> </div> </article>`,
      css: `#i4ugaj{ width:50%; } #ignzst{ padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; margin-top:0px; margin-bottom:0px; margin-right:0px; margin-left:0px; width:100%; border-top-width:0px; border-right-width:0px; border-bottom-width:0px; border-left-width:0px; border-top-style:solid; border-right-style:solid; border-bottom-style:solid; border-left-style:solid; border-top-color:rgb(0, 0, 0); border-right-color:rgb(0, 0, 0); border-bottom-color:rgb(0, 0, 0); border-left-color:rgb(0, 0, 0); border-image-source:initial; border-image-slice:initial; border-image-width:initial; border-image-outset:initial; border-image-repeat:initial; box-shadow:none; } #iqkshg{ width:50%; } #ii1f56{ font-size:18px; line-height:20px; color:rgb(85, 85, 85); } #ihhp7i{ width:50%; } #i44lf2{ font-size:18px; line-height:20px; color:rgb(85, 85, 85); } #iv3p2h{ width:50%; } #iyr21k{ padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; margin-top:0px; margin-bottom:0px; margin-right:0px; margin-left:0px; width:100%; border-top-width:0px; border-right-width:0px; border-bottom-width:0px; border-left-width:0px; border-top-style:solid; border-right-style:solid; border-bottom-style:solid; border-left-style:solid; border-top-color:rgb(0, 0, 0); border-right-color:rgb(0, 0, 0); border-bottom-color:rgb(0, 0, 0); border-left-color:rgb(0, 0, 0); border-image-source:initial; border-image-slice:initial; border-image-width:initial; border-image-outset:initial; border-image-repeat:initial; box-shadow:none; } #i8z61z{ font-size:18px; line-height:20px; color:rgb(85, 85, 85); }`,
    },
    index: "false",
  });
  const [postList, setPostList] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    height: "?",
    width: "?",
  });

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
      //console.error(err);
      setImageDimensions({
        height: "?",
        width: "?",
      });
    };
  };

  const handleBlob = async (blobFile, file) => {
    if (blobFile.type == "video/mp4") {
      return blobFile;
    } else {
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
    }
    // note only the blobFile argument is required
  };
  const UploadMedia = async (data) => {
    let formData = new FormData();

    await Promise.all(
      data.map(async (element) => {
        const file = await handleBlob(element);

        formData.append("files[]", file);
      })
    );

    await axios
      .post(
        process.env.REACT_APP_API_URL + "/medias/upload/" + siteId,
        formData
      )
      .then((response) => {
        let src = response.data.data[0].src;
        //console.log(src)
        setPost({ ...post, thumbnail: src });
        //console.log(post)
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
  const txtTolink = (txt) => {
    return txt
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
      .replace(/\é/g, "e")
      .replace(/\è/g, "e")
      .replace(/\ê/g, "e")
      .replace(/\ë/g, "e")
      .replace(/\à/g, "a")
      .replace(/\â/g, "a")
      .replace(/\ä/g, "a")
      .replace(/\û/g, "u")
      .replace(/\ü/g, "u")

      .replace(/\s/g, "-")
      .toLowerCase();
  };
  const getCategories = async (e) => {
    await axios
      .get(
        process.env.REACT_APP_API_URL + "/blogcategories/getbysite/" + siteId
      )
      .then((response) => {
        //console.log(response.data.data)
        setCategorieList(response.data.data);
        toast.dismiss();
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        // getSites();
        // setshowEdit(false);
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : error.message,
          {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      });
  };
  const deletethumb = (e) => {
    e.preventDefault();
    setPost({ ...post, thumbnail: "https://api-ysbuilder.b-forbiz.com/assets/empty-img.png" });
  };
  const AddBloks = async () => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/blogposts/create", post)
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        getpostList();
        let content = props.editor().getWrapper();
        content.view.render();
        setShowAdd(false);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : error.message,
          {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      });
  };
  const CopyBloks = async (item) => {
    setShowAdd(false);
    delete item["_id"];
    item["url"] = item["url"] + "-" + uuidv4();

    await axios
      .post(process.env.REACT_APP_API_URL + "/blogposts/create", item)
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        getpostList();
        setShowAdd(false);
        let content = props.editor().getWrapper();
        content.view.render();
      })
      .catch((error) => {
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : error.message,
          {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      });
  };
  const EditBloks = async () => {
    setShowEdit(false);
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/blogposts/update/" + post._id,
        post
      )
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        getpostList();
        let content = props.editor().getWrapper();
        content.view.render();
      })
      .catch((error) => {
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : error.message,
          {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      });
  };
  const activateArticle = async (item, checked) => {
    item.state = checked;
    console.log("-----------", item);
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/blogposts/update/" + item._id,
        item
      )
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        getpostList();
        let content = props.editor().getWrapper();
        content.view.render();
      })
      .catch((error) => {
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : error.message,
          {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      });
  };

  const getpostList = async () => {
    await axios
      .get(
        process.env.REACT_APP_API_URL + "/blogposts/getbycat/" + props.data._id
      )
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        setPostList(response.data.data);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : error.message,
          {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      });
  };
  useEffect(() => {}, [showAdd, showEdit]);

  const DeleteBlog = async (id) => {
    await axios
      .delete(process.env.REACT_APP_API_URL + "/blogposts/deletebyid/" + id)
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        getpostList();
        let content = props.editor().getWrapper();
        content.view.render();
        setDeletePost(false);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : error.message,
          {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      });
  };
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", options);
  };
  const editContent = (item) => {
    window.location.href = "/editor/" + siteId + "/article/" + item._id;
  };
  const openEditModal = (item) => {
    setPost(item);

    setShowEdit(true);
  };
  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value; // Get the value from the input field
    setSearch(searchTerm); // Update the search state with the new value
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/blogposts/filter/${props.data._id}`,
        {
          search: searchTerm, // Send the search term to the server
        }
      );
      setPostList(response.data.data);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (error) {
      toast.error(error.response.data.message || error.message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };
  useEffect(() => {
    getpostList();
    getCategories();
  }, []);

  const [search, setSearch] = useState("");
  const [namepost, setNamepost] = useState("");
  const [republier, setRepublier] = useState(false);
  const [publier, setPublier] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [editedItem, setEditedItem] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [showBloks, setShowBloks] = useState(false);
  const [metatitle, setMetaTitle] = useState("");
  const [metadecription, setMetaDecription] = useState("");
  const [showBloksMedia, setShowBloksMedia] = useState(false);
  const [taskCheckboxes, setTaskCheckboxes] = useState([
    {
      date: "Jan 2, 2024",
      name: "m.fernandez",
      categorie: "blog5",
      title: "Profitez au maximum de la saison en suivant ces conseils simples",
      slog: "profitez-au-maximum-de-la-saison-en-suivant-ces-conseils-sim",
      etat: "publier",
      description:
        "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée",
      picture: "",
      metatitle: " meta titre blog5",
      metadecription: " meta decription blog5",
      indexation: "true",
    },
    {
      date: "ferv 5, 2023",
      categorie: "blog1",
      name: "m.fernandez",
      title: "Restez en contact avec les visiteurs de votre site e",
      slog: "restez-en-contact-avec-les-visiteurs-de-votre-site-et-augmente",
      etat: "Brouillon",
      description:
        "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée",
      picture:
        "https://img.freepik.com/photos-premium/illustration-fond-coucher-soleil_785660-1838.jpg",
      metatitle: " meta titre blog1",
      metadecription: " meta decription blog1",
      indexation: "false",
    },
  ]);
  const [indexSeo, setIndexSeo] = useState(false);
  const changeActiveIndex = (value) => {
    setPost({ ...post, index: value });
  };
  const handleClose = () => setRepublier(false);
  const handleDeleteClose = () => setDeletePost(false);
  const handleCloseBloks = () => setShowBloks(false);
  const handleClosePublier = () => setPublier(false);
  const handleCloseinfo = () => setEditInfo(false);
  const Clear = () => {};
  const ShowMedias = () => {
    setShowBloksMedia(!showBloksMedia);
  };

  const RepublierModal = (selectedItem) => {
    // Find the index of the selected item in the array
    const selectedIndex = taskCheckboxes.findIndex(
      (item) => item === selectedItem
    );

    if (selectedIndex !== -1) {
      // Create a new array with the selected item updated
      const updatedCheckboxes = [...taskCheckboxes];
      updatedCheckboxes[selectedIndex] = { ...selectedItem, etat: "Republier" };

      // Update the state with the new array
      setTaskCheckboxes(updatedCheckboxes);

      // Open the Republier modal
      setRepublier(true);
    } else {
      //console.error("Selected item not found in taskCheckboxes array");
    }
  };
  const PublierModal = (selectedItem) => {
    setPublier(true);
  };

  const DeleteArticleModal = (item) => {
    setEditedItem(item);
    setDeletePost(true);
  };
  const handleCheckAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedCheckboxes = taskCheckboxes.map((item) => ({
      ...item,
      isChecked: newSelectAll,
    }));
    setTaskCheckboxes(updatedCheckboxes);
  };

  const handleTaskCheckboxChange = (index) => {
    const updatedCheckboxes = [...taskCheckboxes];
    updatedCheckboxes[index].isChecked = !updatedCheckboxes[index].isChecked;
    setTaskCheckboxes(updatedCheckboxes);

    const allChecked = updatedCheckboxes.every((value) => value.isChecked);
    setSelectAll(allChecked);

    // Update the selected count based on checked checkboxes
    const selectedItems = updatedCheckboxes.filter((item) => item.isChecked);
    setSelectedCount(selectedItems.length);

    // If the checkbox is unchecked, perform the delete action
    if (!updatedCheckboxes[index].isChecked) {
      // Placeholder for delete action, replace with your actual deletion logic
      //console.log("Deleted item:", updatedCheckboxes[index]);
      // Alternatively, you can call a function to handle the deletion
      // deleteItem(updatedCheckboxes[index]);
    }
  };
  const VoirBlog = () => {};

  const DublicateBlog = () => {};

  const Rebublier = () => {};
  const Publier = () => {};

  const restInput = () => {
    setSearch("");
    // Reset taskCheckboxes to the original data
    getpostList();
  };
  const changeView = () => {
    props.changeView(<GererCategorie changeView={props.changeView} />);
  };

  return (
    <div id="GererPosts">
      <div className="d-flex  justify-content-between mb-3">
        <div onClick={(e) => changeView()}>
          <i class="fas fa-long-arrow-alt-left"></i> Retour à list des
          catégories
        </div>
        <div className="SectionAdd">
          <button
            type="button"
            className="btnblogs "
            onClick={(e) => [setShowAdd(true)]}
          >
            Nouveau post
          </button>
        </div>

        <div className="input-group serash-document">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Recherche blog..."
            className="form-control "
          />
          <button onClick={restInput} className="iclosed" type="reset">
            &times;
          </button>
        </div>
      </div>
      <table className="tables">
        <thead>
          <tr>
            <th colSpan={4}>
              {/* <input
                type="checkbox"
                checked={selectAll}
                onChange={handleCheckAll}
              />{" "}
              Publications({selectedCount}/{taskCheckboxes.length}) */}
            </th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.map((item, index) => (
            <tr key={index}>
              {/* <td>
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => handleTaskCheckboxChange(index)}
                />
              </td> */}
              <td className="tableNameSite ">
                <div className="client d-flex gap-2">
                  {item.picture === "" ? (
                    <img src={imgSite} className="img" />
                  ) : (
                    <img src={item.thumbnail} className="img" />
                  )}

                  <span className="clients">
                    <span className="name">
                      {" "}
                      Créer: {formatDate(item.date_creation)}
                    </span>
                    <span className="titleblog d-block">
                      Title : {item.title}
                    </span>
                    <span className="link d-block">
                      <b>Url </b>:{item.url}
                    </span>
                    <p className="slogblog cursor d-block">
                      Desc : {item.resume.substring(0, 100)}...
                    </p>
                  </span>
                </div>
              </td>

              <td>
                {" "}
                <div class="btnactions">
                  <button
                    onClick={() => editContent(item)}
                    title="Edit contenu"
                  >
                    <img src={iconEdit} className="img" alt="Edit contenu" />
                  </button>
                  <button
                    onClick={() => openEditModal(item)}
                    title="Edit informaion blog"
                  >
                    <i class="fa-solid fa-gear"></i>
                  </button>
                  <button
                    onClick={(e) =>
                      window.open(
                        `${process.env.REACT_APP_MEDIA_URL}site/${siteId}/actualites${item.categorie.url}${item.url}`,
                        "_blank"
                      )
                    }
                    title="Voir Blog"
                  >
                    <img src={iconVoir} className="img" alt="Voir Blog" />
                  </button>
                  <button
                    onClick={(e) => CopyBloks(item)}
                    title="Dupliquer Blog"
                  >
                    <i class="fa-regular fa-copy"></i>
                  </button>{" "}
                  <button
                    onClick={() => DeleteArticleModal(item)}
                    title="Supprimer Blog"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  <div class="form-check form-switch mt-3 ">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={"isActiveShadow-"}
                      name={"isActiveShadow-"}
                      checked={item.state.toString() == "true"}
                      onChange={(e) => {
                        activateArticle(item, e.target.checked);
                      }}
                    />
                  </div>
                </div>
                <Modal
                  show={deletePost}
                  onHide={handleDeleteClose}
                  backdrop="static"
                  keyboard={false}
                  className="modalDelete"
                  size="md"
                  id="addPageModal"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header className="add_page_modal_header">
                    <div className="titre_popup_page">
                      <div className="modal_header_add_page ">
                        <div className="titre_popup_add_page">
                          {" "}
                          supprimer le blog
                        </div>

                        <i
                          className="fa-solid fa-xmark closeSideBar"
                          onClick={handleDeleteClose}
                        ></i>
                      </div>
                    </div>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="add_page_modal_content ">
                      <div className="addPageOptions">
                        <div className="add_Page_Options_title">
                          Voulez-vous vraiment supprimer cette aricle{" "}
                          <b> {editedItem.title} ? </b>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      className="btn btn-rounded  btn-outline-secondary"
                      onClick={handleDeleteClose}
                    >
                      Non
                    </button>
                    <button
                      className="btn  btn-rounded btn btn-outline-secondary delete"
                      onClick={(e) => DeleteBlog(editedItem._id)}
                    >
                      Oui
                    </button>
                  </Modal.Footer>
                </Modal>
              </td>

              {/*}
              <td>
                {item.etat == "Brouillon" ? (
                  <div className="etatstatus mb-2">
                    <span>Brouillon</span>
                  </div>
                ) : (
                  <>
                    {" "}
                    <div className="etatstatusp mb-2">
                      <span>Publié(e)</span>
                      <span>Jan 2, 2024</span>
                    </div>
                  </>
                )}
                {item.etat == "Brouillon" ? (
                  <>
                    <div
                      className="statuspublier cursor"
                      onClick={() => PublierModal(item)}
                    >
                      <span>Publier</span>
                    </div>
                    <Modal
                      show={publier}
                      onHide={handleClosePublier}
                      backdrop="static"
                      keyboard={false}
                      className="modalDelete"
                      size="md"
                      id="addPageModal"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header className="add_page_modal_header">
                        <div className="titre_popup_page">
                          <div className="modal_header_add_page ">
                            <div className="titre_popup_add_page">
                              {" "}
                              Publier le blog
                            </div>

                            <i
                              className="fa-solid fa-xmark closeSideBar"
                              onClick={handleClosePublier}
                            ></i>
                          </div>
                        </div>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="add_page_modal_content ">
                          <div className="addPageOptions">
                            <div className="add_Page_Options_title">
                              Voulez-vous vraiment publier ce blog{" "}
                              <b> {item.title} ? </b>
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          className="btn btn-rounded  btn-outline-secondary"
                          onClick={handleClosePublier}
                        >
                          Non
                        </button>
                        <button
                          className="btn  btn-rounded btn btn-outline-secondary delete"
                          onClick={Publier}
                        >
                          Oui
                        </button>
                      </Modal.Footer>
                    </Modal>
                  </>
                ) : (
                  <>
                    <Modal
                      show={republier}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                      className="modalDelete"
                      size="md"
                      id="addPageModal"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header className="add_page_modal_header">
                        <div className="titre_popup_page">
                          <div className="modal_header_add_page ">
                            <div className="titre_popup_add_page">
                              {" "}
                              Républier le blog
                            </div>

                            <i
                              className="fa-solid fa-xmark closeSideBar"
                              onClick={handleClose}
                            ></i>
                          </div>
                        </div>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="add_page_modal_content ">
                          <div className="addPageOptions">
                            <div className="add_Page_Options_title">
                              Voulez-vous vraiment republier ce blog{" "}
                              <b> {item.title} ? </b>
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          className="btn btn-rounded  btn-outline-secondary"
                          onClick={handleClose}
                        >
                          Non
                        </button>
                        <button
                          className="btn  btn-rounded btn btn-outline-secondary delete"
                          onClick={Rebublier}
                        >
                          Oui
                        </button>
                      </Modal.Footer>
                    </Modal>
                    <div
                      className="statusrepublier cursor"
                      onClick={() => RepublierModal(item)}
                    >
                      <span>Republier</span>
                    </div>
                  </>
                )}
              </td>*/}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        show={editInfo}
        onHide={handleCloseinfo}
        backdrop="static"
        keyboard={false}
        className="modalDelete"
        size="md"
        id="addPageModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add_page_modal_header">
          <div className="titre_popup_page">
            <div className="modal_header_add_page ">
              <div className="titre_popup_add_page"> Edit information blog</div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleCloseinfo}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content ">
            <div className="addPageOptions">
              <div className="add_Page_Options_title">
                <EditInfoPosts dataIem={editedItem} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={handleCloseinfo}
          >
            Non
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary delete"
            onClick={Publier}
          >
            Oui
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAdd}
        onHide={(e) => setShowAdd(false)}
        backdrop="static"
        keyboard={false}
        size="xl"
        id="addPost"
        centered
      >
        <Modal.Header>
          <div className="w-100 text-light d-flex justify-content-between align-items-center">
            <div>Ajouter une article</div>

            <i
              className="fa-solid fa-xmark closeSideBar"
              onClick={(e) => {
                setShowAdd(false);
              }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center p-3 gap-4">
            <div className="w-25 me-3">
              <Dropzone
                style={{ height: "50px" }}
                onDrop={(acceptedFiles) => UploadMedia(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }) => (
                  <section className="mb-3">
                    <div className="thumbeditor relative">
                      <div
                        {...getRootProps()}
                        className="drop-zone"
                        style={{
                          backgroundImage: post.thumbnail
                            ? `url(${post.thumbnail})`
                            : `url(${fallbackImage})`,
                          backgroundSize: post.thumbnail ? "cover" : "45px",
                        }}
                      >
                        <input {...getInputProps()} required />
                        <i className="fa fa-edit" />
                        <p
                          className={`${post.thumbnail ? "d-none" : "d-block"}`}
                        >
                          Déposez votre image ici
                        </p>
                      </div>
                      <div className="actionThumb">
                        <i
                          className="fa fa-trash"
                          onClick={(e) => [e.preventDefault(), deletethumb(e)]}
                        />
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="w-75">
              <div class="form-check form-switch mt-3 indexationtitre mb-3 d-flex justify-content-between  gap-4">
                <label className="form-check-label" htmlFor="isActiveShadow">
                  Bloquez l'activité des bots{" "}
                  <b>d'indexation sur cette article </b>de façon à ce qu'elle
                  n'apparaisse pas dans les résultats de recherche.
                </label>

                <input
                  className="form-check-input"
                  type="checkbox"
                  id={"isActiveShadow-"}
                  name={"isActiveShadow-"}
                  required
                  checked={post.index == "true"}
                  onChange={(e) => {
                    setPost({ ...post, index: e.target.checked.toString });
                  }}
                />
              </div>

              <div className="form-group m-form__group group_text">
                <label className="mb-2">Titre d'article :</label>
                <input
                  required
                  type="text"
                  className="form-control namePage mb-3"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder="Titre du post"
                  value={post.title}
                  onChange={(e) => {
                    setPost({
                      ...post,
                      title: e.target.value,
                      url: "/" + txtTolink(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="form-group m-form__group group_text  mb-3">
                <label className="mb-2">Lien d'article :</label>

                <input
                  required
                  type="text"
                  className="form-control namePage"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder="Url d'article"
                  value={post.url}
                  onChange={(e) => {
                    setPost({ ...post, url: "/" + txtTolink(e.target.value) });
                  }}
                />
              </div>
              <div className="form-group m-form__group group_text  mb-3">
                <label className="mb-2">Resumé d'article :</label>
                <textarea
                  required
                  row="3"
                  className="form-control namePage"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder="Resumé d'article"
                  value={post.resume}
                  onChange={(e) => {
                    setPost({ ...post, resume: e.target.value });
                  }}
                />
              </div>
              {/* <div>
                <div className="form-group m-form__group group_text mb-3">

                  <label className="mb-2">Assigner à une categorie :</label>
                  <select></select>
                </div>
              </div> */}
              <div className="form-group m-form__group group_text mb-3">
                <label className="mb-2">Meta titre d'article :</label>

                <input
                  required
                  type="text"
                  className="form-control namePage"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder="Meta title"
                  value={post.meta_title}
                  onChange={(e) => {
                    setPost({ ...post, meta_title: e.target.value });
                  }}
                />
              </div>
              <div className="form-group m-form__group group_text mb-3">
                <label className="mb-2">Meta description d'article :</label>

                <input
                  required
                  type="text"
                  className="form-control namePage"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder="Meta description"
                  value={post.meta_description}
                  onChange={(e) => {
                    setPost({ ...post, meta_description: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={(e) => setShowAdd(false)}
          >
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
            onClick={(e) => AddBloks()}
          >
            Ajouter
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEdit}
        onHide={(e) => setShowEdit(false)}
        backdrop="static"
        keyboard={false}
        size="xl"
        id="addPost"
        centered
      >
        <Modal.Header>
          <div className="w-100 text-light d-flex justify-content-between align-items-center">
            <div>Editez cette article</div>

            <i
              className="fa-solid fa-xmark closeSideBar"
              onClick={(e) => {
                setShowEdit(false);
              }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center p-3">
            <div className="w-25 me-3">
              <Dropzone
                style={{ height: "50px" }}
                onDrop={(acceptedFiles) => UploadMedia(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }) => (
                  <section className="mb-3">
                    <div className="thumbeditor relative">
                      <div
                        {...getRootProps()}
                        className="drop-zone"
                        style={{
                          backgroundImage: post.thumbnail
                            ? `url(${post.thumbnail})`
                            : `url(${fallbackImage})`,
                          backgroundSize: post.thumbnail ? "cover" : "45px",
                        }}
                      >
                        <input {...getInputProps()} />
                        <i className="fa fa-edit" />
                        <p
                          className={`${post.thumbnail ? "d-none" : "d-block"}`}
                        >
                          Déposez votre image ici
                        </p>
                      </div>
                      <div className="actionThumb">
                        <i
                          className="fa fa-trash"
                          onClick={(e) => [e.preventDefault(), deletethumb(e)]}
                        />
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="w-75">
              <div class="form-check form-switch mt-3 mb-3 indexationtitre d-flex justify-content-between gap-4">
                <label className="form-check-label " htmlFor="isActiveShadow">
                  Bloquez l'activité des bots{" "}
                  <b>d'indexation sur cette article </b>de façon à ce qu'elle
                  n'apparaisse pas dans les résultats de recherche.
                </label>

                <input
                  className="form-check-input"
                  type="checkbox"
                  id={"isActiveShadow-"}
                  name={"isActiveShadow-"}
                  checked={post.index}
                  onChange={(e) => {
                    setPost({ ...post, index: e.target.checked });
                  }}
                />
                {post.index}
              </div>

              <div className="form-group m-form__group group_text">
                <label className="mb-2">Titre d'article :</label>

                <input
                  required
                  type="text"
                  className="form-control namePage"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder="Titre du post"
                  value={post.title}
                  onChange={(e) => {
                    setPost({ ...post, title: e.target.value });
                  }}
                />
              </div>
              <div className="form-group m-form__group group_text  mb-3">
                <label className="mb-2">Lien d'article :</label>

                <input
                  required
                  type="text"
                  className="form-control namePage"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder="Identifiant du catégorie"
                  value={post.url}
                  onChange={(e) => {
                    setPost({ ...post, url: "/" + txtTolink(e.target.value) });
                  }}
                />
              </div>
              <div className="form-group m-form__group group_text  mb-3">
                <label className="mb-2">Date d'article :</label>

                <input
                  type="date"
                  className="form-control namePage"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder="Identifiant du catégorie"
                  value={post.date_creation}
                  onChange={(e) => {
                    setPost({ ...post, date_creation: e.target.value });
                  }}
                />
              </div>
              <div className="form-group m-form__group group_text  mb-3">
                <label className="mb-2">Resumé d'article :</label>

                <textarea
                  required
                  row="3"
                  className="form-control namePage"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder="Descriptipn du catégorie"
                  value={post.resume}
                  onChange={(e) => {
                    setPost({ ...post, resume: e.target.value });
                  }}
                />
              </div>
              {/* <div className="form-group m-form__group group_text mb-3">

                <label class="mb-2">Assigner à une categorie :</label>
                <select></select>
              </div> */}

              <div className="form-group m-form__group group_text">
                <label className="mb-2">Meta titre d'article :</label>

                <input
                  required
                  type="text"
                  className="form-control namePage"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder="Meta title"
                  value={post.meta_title}
                  onChange={(e) => {
                    setPost({ ...post, meta_title: e.target.value });
                  }}
                />
              </div>
              <div className="form-group m-form__group group_text">
                <label className="mb-2">Meta description d'article :</label>

                <input
                  required
                  type="text"
                  className="form-control namePage"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder="Meta description"
                  value={post.meta_description}
                  onChange={(e) => {
                    setPost({ ...post, meta_description: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={(e) => setShowEdit(false)}
          >
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
            onClick={(e) => EditBloks()}
          >
            Editer
          </button>
        </Modal.Footer>
      </Modal>

      <Toaster />
    </div>
  );
}
