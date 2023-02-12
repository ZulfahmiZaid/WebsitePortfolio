const about_btn = document.querySelector(".About-Button");
const project_btn = document.querySelector(".Project-Button");
const contact_btn = document.querySelector(".Contact-Button");

const about_icon = document.querySelector(".fa-user");
const project_icon = document.querySelector(".fa-screwdriver-wrench");
const contact_icon = document.querySelector(".fa-envelope");

const close_abt_btn = document.querySelector(".Close-About");
const close_con_btn = document.querySelector(".Close-Contact");
const close_pro_btn = document.querySelector(".Close-Projects");

const profilePic = document.querySelector(".PicWrapper");
const popup_about = document.querySelector(".About");
const popup_contact = document.querySelector(".Contact");
const popup_projects = document.querySelector(".Projects");

const dialogue_nav = document.querySelector(".Nav");
const dialogue_welcome = document.querySelector(".Welcome");

const dialogue_all = document.querySelector(".Dialogue");

const popup_C1 = document.querySelector(".C1");
const popup_C2 = document.querySelector(".C2");

let detector = new MobileDetect(window.navigator.userAgent);
let mobile = detector.mobile();

const button_active_color = "black";
const icon_active_color = "white";

const button_enabled_color = "#f0f0f0";
const button_disabled_color = "darkgray";

about_btn.addEventListener("click", function() {
   if(mobile === null) {
      popup_about.style.display = "grid";
      popup_about.style.animation = "about-slide-in 2s ease";

      profilePic.style.animation = "pic-slide-right 2s ease forwards";
      dialogue_nav.style.animation = "nav-slide-down 1s ease forwards";
      dialogue_welcome.style.animation = "PCB-slide-up 1s ease forwards";
   }
   else{
      popup_about.style.display = "grid";
      popup_about.style.animation = "about-slide-in 2s ease forwards";

      profilePic.style.animation = "contact-slide-out 2s ease forwards";
      dialogue_all.style.animation = "contact-slide-out 2s ease forwards";
   }

   about_btn.style.backgroundColor = button_active_color;
   about_icon.style.color = icon_active_color;
   about_btn.disabled = true;

   project_btn.style.backgroundColor = button_disabled_color;
   project_btn.disabled = true;

   contact_btn.style.backgroundColor = button_disabled_color;
   contact_btn.disabled = true;
});

close_abt_btn.addEventListener("click", function (){

   popup_about.style.animation = "about-slide-out 2s ease";

   if(mobile === null) {
      profilePic.style.animation = "pic-reset-from-about 2s ease forwards";
   }else{
      profilePic.style.animation = "contact-slide-in 2s ease forwards";
      dialogue_all.style.animation = "contact-slide-in 2s ease forwards";

   }

   setTimeout(() => {
      popup_about.style.display = "none";

      if (mobile === null) {
      dialogue_nav.style.animation = "about-slide-in 1s ease forwards";
      dialogue_welcome.style.animation = "contact-slide-in 1s ease forwards";
      }

      about_btn.style.backgroundColor = button_enabled_color;
      about_icon.style.color = button_active_color;

      project_btn.style.backgroundColor = button_enabled_color;
      project_btn.disabled = false;

      contact_btn.style.backgroundColor = button_enabled_color;
      contact_btn.disabled = false;

      about_btn.disabled = false;
   }, 2000);
});

contact_btn.addEventListener("click", function (){
   popup_contact.style.display = "flex";
   popup_contact.style.animation = "contact-slide-in 2s ease";

   if(mobile === null) {
      profilePic.style.animation = "pic-slide-left 2s ease forwards";
      dialogue_nav.style.animation = "nav-slide-down 1s ease forwards";
      dialogue_welcome.style.animation = "PCB-slide-up 1s ease forwards";
   }else{
      profilePic.style.animation = "about-slide-out 2s ease forwards";
      dialogue_all.style.animation = "about-slide-out 2s ease forwards";
   }

   contact_btn.style.backgroundColor = button_active_color;
   contact_icon.style.color = icon_active_color;
   contact_btn.disabled = true;

   project_btn.style.backgroundColor = button_disabled_color;
   project_btn.disabled = true;

   about_btn.style.backgroundColor = button_disabled_color;
   about_btn.disabled = true;
});

close_con_btn.addEventListener("click", function (){
   popup_contact.style.animation = "contact-slide-out 2s ease";

   if(mobile === null) {
      profilePic.style.animation = "pic-reset-from-contact 2s ease forwards";
   }else{
      profilePic.style.animation = "about-slide-in 2s ease forwards";
      dialogue_all.style.animation = "about-slide-in 2s ease forwards";
   }

   setTimeout(() => {
      popup_contact.style.display = "none";

      if(mobile === null) {
         dialogue_nav.style.animation = "about-slide-in 1s ease forwards";
         dialogue_welcome.style.animation = "contact-slide-in 1s ease forwards";
      }

      contact_btn.style.backgroundColor = button_enabled_color;
      contact_icon.style.color = button_active_color;

      project_btn.style.backgroundColor = button_enabled_color;
      project_btn.disabled = false;

      about_btn.style.backgroundColor = button_enabled_color;
      about_btn.disabled = false;

      contact_btn.disabled = false;
   }, 2000);
});

project_btn.addEventListener("click", function (){
   popup_projects.style.display = "grid";

   dialogue_nav.style.animation = "about-slide-out 1s ease forwards";
   dialogue_welcome.style.animation = "contact-slide-out 1s ease forwards";

   if(mobile){
      profilePic.style.animation = "about-slide-out 1s ease forwards";
   }

   project_btn.style.backgroundColor = button_active_color;
   project_icon.style.color = icon_active_color;
   project_btn.disabled = true;

   contact_btn.style.backgroundColor = button_disabled_color;
   contact_btn.disabled = true;

   about_btn.style.backgroundColor = button_disabled_color;
   about_btn.disabled = true;
});

close_pro_btn.addEventListener("click", function (){

   close_pro_btn.style.animation = "PCB-slide-up 1s ease";
   popup_C1.style.cssText = "animation: C1-slide-left 1s ease";
   popup_C2.style.cssText = "animation: C2-slide-right 1s ease";

   setTimeout(() => {
      popup_projects.style.display = "none";
      close_pro_btn.style.removeProperty("animation");
      popup_C1.style.removeProperty("animation");
      popup_C2.style.removeProperty("animation");

      if(mobile === null) {
         dialogue_nav.style.animation = "PCB-slide-down 1s ease forwards";
         dialogue_welcome.style.animation = "welcome-slide-up 1s ease forwards";
      }else{
         profilePic.style.animation = "PCB-slide-down 1s ease forwards";
         dialogue_welcome.style.animation = "welcome-slide-up 1s ease forwards";
         dialogue_nav.style.animation = "welcome-slide-up 1s ease forwards";
      }

      project_btn.style.backgroundColor = button_enabled_color;
      project_icon.style.color = button_active_color;

      contact_btn.style.backgroundColor = button_enabled_color;
      contact_btn.disabled = false;

      about_btn.style.backgroundColor = button_enabled_color;
      about_btn.disabled = false;

      project_btn.disabled = false;
   }, 1000);
});
