export const optionsGallery = {
  default: `{
    galleryMosaic: [
      // default layout
      { w: 2, h: 2, c: 1, r: 1 },
      { w: 1, h: 1, c: 3, r: 1 },
      { w: 1, h: 1, c: 3, r: 2 },
      { w: 1, h: 2, c: 4, r: 1 },
      { w: 2, h: 1, c: 5, r: 1 },
      { w: 2, h: 2, c: 5, r: 2 },
      { w: 1, h: 1, c: 4, r: 3 },
      { w: 2, h: 1, c: 2, r: 3 },
      { w: 1, h: 2, c: 1, r: 3 },
      { w: 1, h: 1, c: 2, r: 4 },
      { w: 2, h: 1, c: 3, r: 4 },
      { w: 1, h: 1, c: 5, r: 4 },
      { w: 1, h: 1, c: 6, r: 4 },
    ],
    galleryMosaicXS: [
      // layout for XS width
      { w: 2, h: 2, c: 1, r: 1 },
      { w: 1, h: 1, c: 3, r: 1 },
      { w: 1, h: 1, c: 3, r: 2 },
      { w: 1, h: 2, c: 1, r: 3 },
      { w: 2, h: 1, c: 2, r: 3 },
      { w: 1, h: 1, c: 2, r: 4 },
      { w: 1, h: 1, c: 3, r: 4 },
    ],
    galleryMosaicSM: [
      // layout for SM width
      { w: 2, h: 2, c: 1, r: 1 },
      { w: 1, h: 1, c: 3, r: 1 },
      { w: 1, h: 1, c: 3, r: 2 },
      { w: 1, h: 2, c: 1, r: 3 },
      { w: 2, h: 1, c: 2, r: 3 },
      { w: 1, h: 1, c: 2, r: 4 },
      { w: 1, h: 1, c: 3, r: 4 },
    ],
    galleryMaxRows: 1,
    galleryDisplayMode: "rows",
    gallerySorting: "random",
    thumbnailDisplayOrder: "random",

    thumbnailHeight: "180",
    thumbnailWidth: "220",
    thumbnailAlignment: "scaled",
    thumbnailGutterWidth: 0,
    thumbnailGutterHeight: 0,
    thumbnailBorderHorizontal: 0,
    thumbnailBorderVertical: 0,

    thumbnailToolbarImage: null,
    thumbnailToolbarAlbum: null,
    thumbnailLabel: { display: false },

    // DISPLAY ANIMATION
    // for gallery
    galleryDisplayTransitionDuration: 1500,
    // for thumbnails
    thumbnailDisplayTransition: "imageSlideUp",
    thumbnailDisplayTransitionDuration: 1200,
    thumbnailDisplayTransitionEasing: "easeInOutQuint",
    thumbnailDisplayInterval: 60,

    // THUMBNAIL HOVER ANIMATION
    thumbnailBuildInit2: "image_scale_1.15",
    thumbnailHoverEffect2:
      "thumbnail_scale_1.00_1.05_300|image_scale_1.15_1.00",
    touchAnimation: true,
    touchAutoOpenDelay: 500,

    // LIGHTBOX
    viewerToolbar: { display: false },
    viewerTools: {
      topLeft: "label",
      topRight:
        "shareButton, rotateLeft, rotateRight, fullscreenButton, closeButton",
    },

    // GALLERY THEME
    galleryTheme: {
      thumbnail: { background: "#111" },
    },

    // DEEP LINKING
    locationHash: true,
  }`,
  mosaic: `{
    // GALLERY AND THUMBNAIL LAYOUT
    galleryMosaic: [
      // default layout
      { w: 16, h: 18, c: 1, r: 1 },
      { w: 8, h: 9, c: 21, r: 5 },
      { w: 4, h: 6, c: 28, r: 2 },
      { w: 4, h: 6, c: 19, r: 11 },
      { w: 6, h: 8, c: 27, r: 10 },
    ],
    galleryMosaicXS: [
      // layout for XS width
      { w: 6, h: 9, c: 1, r: 1 },
      { w: 4, h: 4, c: 9, r: 3 },
      { w: 2, h: 3, c: 12, r: 1 },
      { w: 2, h: 3, c: 8, r: 5 },
      { w: 3, h: 4, c: 12, r: 6 },
    ],
    galleryMosaicSM: [
      // layout for SM width
      { w: 6, h: 9, c: 1, r: 1 },
      { w: 4, h: 4, c: 9, r: 3 },
      { w: 2, h: 3, c: 12, r: 1 },
      { w: 2, h: 3, c: 8, r: 5 },
      { w: 3, h: 4, c: 12, r: 6 },
    ],
    galleryMaxRows: 1,
    galleryDisplayMode: "rows",
    gallerySorting: "random",
    thumbnailDisplayOrder: "random",

    thumbnailAlignment: "scaled",
    thumbnailHeight: 100,
    thumbnailWidth: 100,
    thumbnailGutterWidth: 0,
    thumbnailGutterHeight: 0,
    thumbnailBorderHorizontal: 0,
    thumbnailBorderVertical: 0,

    thumbnailToolbarImage: null,
    thumbnailToolbarAlbum: null,

    thumbnailLabel: { display: false },

    // DISPLAY ANIMATION
    galleryDisplayTransition: "rotateX", // gallery display animation
    galleryDisplayTransitionDuration: 1500,
    thumbnailDisplayTransition: "scaleUp", // thumbnail display animation
    thumbnailDisplayTransitionDuration: 600,
    thumbnailDisplayInterval: 30,

    // HOVER ANIMATION
    thumbnailBuildInit2:
      ".nGY2GThumbnailAlbumTitle_border-left_5px solid #23CB99|.nGY2GThumbnailAlbumTitle_margin_20px|\
              title_backgroundColor_rgba(200,200,200,0.8)|title_color_#000",
    thumbnailHoverEffect2:
      "image_scale_1.00_1.15_500_bounce|image_rotateZ_0deg_05deg",
    touchAnimation: true,
    touchAutoOpenDelay: 500,

    // LIGHTBOX
    viewerToolbar: {
      // bottom toolbar
      display: true,
      standard: "label",
      minimized: "label",
    },
    viewerTools: {
      topLeft: "",
      topRight: "rotateLeft, rotateRight, fullscreenButton, closeButton",
    },

    // DEEP LINKING
    locationHash: false,
  }`,
  grid: `{
    // GALLERY AND THUMBNAIL LAYOUT
    galleryDisplayMode: "moreButton",
    galleryMaxRows: 3,
    galleryMaxItems: 15,
    gallerySorting: "random",

    thumbnailHeight: "300 XS200 SM200", // RESPONSIVE THUMBNAIL HEIGHT: default=300px, XS resolution=200px, SM resolution=200px
    thumbnailWidth: "300 XS180 SM200", // RESPONSIVE THUMBNAIL WIDTH:  default=300px, XS resolution=180px, SM resolution=200px

    thumbnailAlignment: "center",
    thumbnailBorderHorizontal: 0,
    thumbnailBorderVertical: 0,
    thumbnailGutterWidth: "80 XS20 SM20",
    thumbnailGutterHeight: "80 XS20 SM20",

    // THUMBNAIL TOOLS & LABEL
    thumbnailLabel: {
      display: true,
      position: "onBottom",
      align: "left",
    },
    thumbnailToolbarImage: { bottomLeft: "display" },
    // replace the default DISPLAY tool icon
    icons: {
      thumbnailDisplay:
        '<i class="fa fa-long-arrow-right" aria-hidden="true"></i> Afficher',
    },

    // DISPLAY ANIMATION
    galleryDisplayTransition: "slideUp",
    galleryDisplayTransitionDuration: 1000,
    thumbnailDisplayTransition: "scaleDown",
    thumbnailDisplayTransitionDuration: 300,
    thumbnailDisplayInterval: 50,

    // THUMBNAIL'S HOVER ANIMATION
    thumbnailBuildInit2: "tools_font-size_1.5em|title_font-size_1.5em",
    thumbnailHoverEffect2:
      "image_scale_1.00_1.20_1000|tools_opacity_0_1|tools_translateX_-30px_0px|title_opacity_1_0|title_translateX_0px_-30px",
    touchAnimation: true,
    touchAutoOpenDelay: 800,

    // GALLERY THEME
    galleryTheme: {
      thumbnail: {
        borderRadius: "10px",
        background: "#2a2a2a",
        titleShadow: "none",
        titleColor: "#fff",
        labelBackground: "#2a2a2a",
      },
      thumbnailIcon: { color: "#fff", shadow: "none" },
    },

    // LIGHTBOX
    // Hide the bottom toolbar and media title
    viewerToolbar: { display: false },

    // DEEP LINKING
    locationHash: false,
  }`,
  filter: `{
    // CONTENT SOURCE
    // The optional add-on nanoPhotosProvider is used for this example - this is not mandatory and can easily be replaced by a list of medias

    // KEYWORD FILTERING
    galleryFilterTags: true,
    galleryFilterTagsMode: "multiple",

    // GALLERY AND THUMBNAIL LAYOUT
    thumbnailHeight: "250",
    thumbnailWidth: "250",
    thumbnailAlignment: "fillWidth",
    galleryDisplayMode: "fullContent",
    gallerySorting: "random",

    thumbnailGutterWidth: 10,
    thumbnailGutterHeight: 10,
    thumbnailBorderHorizontal: 2,
    thumbnailBorderVertical: 2,

    // DISPLAY ANIMATION
    galleryDisplayTransitionDuration: 1000,
    thumbnailDisplayTransition: "slideRight",
    thumbnailDisplayTransitionDuration: 300,
    thumbnailDisplayInterval: 150,
    thumbnailDisplayOrder: "colFromRight",

    // THUMBNAIL TOOLS & LABEL
    thumbnailLabel: {
      display: true,
      position: "onBottomOverImage",
      hideIcons: true,
      titleFontSize: "1em",
      align: "left",
      titleMultiLine: true,
      displayDescription: false,
    },
    thumbnailToolbarImage: null,
    thumbnailToolbarAlbum: null,

    // THUMBNAIL HOVER ANIMATION
    thumbnailHoverEffect2:
      "label_font-size_1em_1.5em|title_backgroundColor_rgba(255,255,255,0.34)_rgba(((35,203,153,0.8)|title_color_#000_#fff|image_scale_1.00_1.10_5000|image_rotateZ_0deg_4deg_5000",
    touchAnimation: true,
    touchAutoOpenDelay: 800,

    // GALLERY THEME
    galleryTheme: {
      thumbnail: {
        titleShadow: "none",
        titleColor: "#fff",
        borderColor: "#fff",
      },
      navigationBreadcrumb: { background: "#3C4B5B" },
      navigationFilter: {
        background: "#003C3F",
        backgroundSelected: "#2E7C7F",
        color: "#fff",
      },
    },

    // DEEP LINKING
    locationHash: false,
  }`,
};
