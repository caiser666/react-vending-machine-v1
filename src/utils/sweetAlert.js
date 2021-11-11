import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MainLoading } from "../assets/gifs";
import "./sweetAlert.css";

const timeout = 5000;
const showTimer = 2000;
const swal = withReactContent(Swal);

const swalLoading = () => {
  swal.fire({
    text: "Please wait",
    // footer: "Please wait",
    width: 230,
    imageUrl: MainLoading,
    imageWidth: 72,
    imageHeight: 72,
    imageAlt: "loading....",
    showCancelButton: false,
    showCloseButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEnterKey: false,
    allowEscapeKey: false,
    timer: timeout,
    customClass: `swal-custom`,
  });
};

const swalSuccess = (titleText, text, confrimed) => {
  //console.log("swalSuccess");
  swal
    .fire({
      titleText: titleText,
      title: "title",
      text: text,
      // footer: "Please wait",
      width: 320,
      imageAlt: "loading....",
      showCancelButton: false,
      showCloseButton: false,
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      timer: timeout,
      customClass: `swal-custom`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: '<i className=""></i> oke',
      willClose: () => {
        confrimed();
      },
    })
    .then((result) => {
      if (result.isConfirmed) {
        confrimed();
        Swal.close();
      }
    });
};

var toastMixin = Swal.mixin({
  toast: true,
  icon: `success`,
  title: `general title`,
  showConfirmButton: false,
  // animation: false,
  position: `top-end`,
  padding: `6px`,
  timer: showTimer,
  customClass: `swal-toast-custom`,
  // timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const swalResultToast = (type, message) => {
  return toastMixin.fire({
    // animation: true,
    title: message,
    icon: type,
  });
};

const swalResult = (type, message) => {
  return swal.fire({
    icon: type,
    text: message,
    width: 300,
    height: 50,
    showConfirmButton: false,
    timer: showTimer,
    customClass: `.swal-custom`,
  });
};

// const bootstrapButtonsMixin = Swal.mixin({
//   customClass: {
//     confirmButton: "btn btn-success m-2",
//     cancelButton: "btn btn-danger m-2",
//   },
//   buttonsStyling: false,
// });

const swalPermission = (message, confrimed) => {
  //console.log(message);
  swal
    .fire({
      text: message,
      icon: "warning",
      timer: timeout,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Iya, Batal Transakasi",
      cancelButtonText: "Tidak",
      reverseButtons: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        confrimed();
      } else {
        return false;
      }
    });
};

export {
  swalLoading,
  swalResultToast,
  swalResult,
  swalPermission,
  swalSuccess,
};
