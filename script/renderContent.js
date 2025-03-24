const root = document.querySelector(':root');



function changeCursor(index) {

    cursor.hidden();

    switch (cursorList[index]) {

        case 'arrow-pointer':

            cursor = new ArrowPointer();

            break;

        case 'big-circle':

            cursor = new BigCircle();

            break;

    }

}

class ArrowPointer {

    constructor() {

        this.root = document.body;

        this.cursor = document.querySelector(".curzr-arrow-pointer");



        this.position = {

                distanceX: 0,

                distanceY: 0,

                distance: 0,

                pointerX: 0,

                pointerY: 0,

            },

            this.previousPointerX = 0;

        this.previousPointerY = 0;

        this.angle = 0;

        this.previousAngle = 0;

        this.angleDisplace = 0;

        this.degrees = 57.296;

        this.cursorSize = 20;



        this.cursorStyle = {

            boxSizing: 'border-box',

            position: 'fixed',

            top: '50%',

            left: '50%',

            transform: 'translate(-50%, -50%)',

            zIndex: '2147483647',

            width: `${ this.cursorSize }px`,

            height: `${ this.cursorSize }px`,

            transition: '250ms, transform 100ms',

            userSelect: 'none',

            pointerEvents: 'none'

        }



        this.init(this.cursor, this.cursorStyle);

    }



    init(el, style) {

        Object.assign(el.style, style);

        setTimeout(() => {

            this.cursor.removeAttribute("hidden")

        }, 500);

        this.cursor.style.opacity = 1;

    }



    move(event) {

        this.previousPointerX = this.position.pointerX;

        this.previousPointerY = this.position.pointerY;

        this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x;

        this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y;

        this.position.distanceX = this.previousPointerX - this.position.pointerX;

        this.position.distanceY = this.previousPointerY - this.position.pointerY;

        this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2);



        this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`;



        if (this.distance > 1) {

            this.rotate(this.position);

        } else {

            this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`;

        }

    }



    rotate(position) {

        let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees;

        let modAngle;

        const style = this.cursor.style;

        this.previousAngle = this.angle;



        if (position.distanceX <= 0 && position.distanceY >= 0) {

            this.angle = 90 - unsortedAngle + 0;

        } else if (position.distanceX < 0 && position.distanceY < 0) {

            this.angle = unsortedAngle + 90;

        } else if (position.distanceX >= 0 && position.distanceY <= 0) {

            this.angle = 90 - unsortedAngle + 180;

        } else if (position.distanceX > 0 && position.distanceY > 0) {

            this.angle = unsortedAngle + 270;

        }



        if (isNaN(this.angle)) {

            this.angle = this.previousAngle;

        } else {

            if (this.angle - this.previousAngle <= -270) {

                this.angleDisplace += 360 + this.angle - this.previousAngle;

            } else if (this.angle - this.previousAngle >= 270) {

                this.angleDisplace += this.angle - this.previousAngle - 360;

            } else {

                this.angleDisplace += this.angle - this.previousAngle;

            }

        }

        style.left = `${ -this.cursorSize / 2 }px`;

        style.top = `${ 0 }px`;

        style.transform += ` rotate(${this.angleDisplace}deg)`;

    }



    hidden() {

        this.cursor.style.opacity = 0;

        setTimeout(() => {

            this.cursor.setAttribute("hidden", "hidden")

        }, 500);

    }

}

let cursor = new ArrowPointer()

document.onmousemove = function(event) {

    cursor.move(event)

}

document.ontouchmove = function(event) {

    cursor.move(event.touches[0])

}

document.onclick = function() {

    if (typeof cursor.click === 'function') {

        cursor.click()

    }

}

function navigateTo(page) {
    window.location.href = page;
}

export function RenderContent() {


    // ----------------RENDERING HOME SECTION-------------------//
    const homeDetails = {
        greetTxt: `Hello Guys, I'm`,
        name: 'Raditya Ruitama Hartono',
        profilePhoto: 'Profil.jpg',
        // ini Profil kalian
        welcomeTxt: 'Welcome to portofolio Raditya1ty.',
        dcLink: 'https://discord.gg/7UZanry5',
        tiktokLink: 'https://www.tiktok.com/@radit_progaming',
        instagramLink: 'https://www.instagram.com/ztoradit1?igsh=ZnloZ3R0NDBpdHlj',
        ytLink: 'https://www.youtube.com/@Officialraditst'
    }

    const homeHTML = `
    <div class="profile-detail">
      <p>${homeDetails.greetTxt}</p>
      <h1 class="my-name gradient-word">${homeDetails.name}</h1>
      <h2 class="display-skills gradient-word"></h2>
      <p>${homeDetails.welcomeTxt}</p>
      <div class="my-social-media-accounts">
        <a
          class="social-media"
          target="_blank"
          href="${homeDetails.dcLink}">
          <img src="images and icons/icons/download (1).png" alt="dc icon" />
        </a>
        <a
          class="social-media"
          target="_blank"
          href="${homeDetails.tiktokLink}">
          <img src="images and icons/icons/tik-tok.png" alt="tiktok icon" />
        </a>
        <a
          class="social-media"
          target="_blank"
          href="${homeDetails.ytLink}">
          <img src="images and icons/icons/youtube.png" alt="YT icon" />
        </a>
        <a class="social-media" target="_blank" href="${homeDetails.instagramLink}">
          <img src="images and icons/icons/instagram (1).png" alt="insta icon" />
        </a>
      </div>
    </div>

    <div class="profile-pic">
      <div id="first-layer">
        <img
          id="profile-img"
          src="images and icons/images/${homeDetails.profilePhoto}"
          alt="profile img" />
      </div>
    </div>
  `;

    const homeSection = document.querySelector('#home-section').innerHTML = homeHTML;





    // ----------------RENDERING ABOUT SECTION-------------------//
    const aboutDetails = {
        myPhoto: 'sayangtercinta.jpg',
        // ini buat foto kalian di about
        aboutMeFirstPrgrph: `
    when I entered junior high school I used to like a girl named Salsabila Cantika Angreini well she used to like being close to me and I used to be shy well on August 13, 2024 and that day during Informatics class I used to play computer like kids in general watching YouTube and I was invited to watch together in the chair next to me we watched like people were dating jir and she wanted to stick close to me when she came home from school she asked me to play free fire and I said let's go.`,
        aboutMeSecondPrgrph: `
    And chat me on whatsapp he chat like this Dit let's play together I'm ready I said where's your ID and he gave it to me then he said if we lose byOne we'll become a couple and I said no we'll just be friends. and when I lost he went offline I thought he was ordered by his mother to go to the shop and that night my teacher wanted to give me an assignment to take a photo for decoration and this Salsabila chatted me Dit helped me edit my photo I haven't finished, and I did it according to what Salsabila said and the next day I held hands jir. If you want to continue tomorrow`
    }

    const aboutHTML = `
    <h2 class="section-name about">ABOUT ME <span class="line"></span></h2>
    <div class="container">
      <div>
        <img
          class="profile-pic"
          src="images and icons/images/${aboutDetails.myPhoto}"
          alt="profile img" />
      </div>
      <div class="about-self scroll-reveal">
        <p class="first-paragraph">
          <span>${aboutDetails.aboutMeFirstPrgrph}</span>
        </p>
        <br />
        <p class="second-paragraph">
          <span>${aboutDetails.aboutMeSecondPrgrph}</span>
        </p>
      </div>
    </div>
   `

    const aboutSection = document.querySelector('#about-section').innerHTML = aboutHTML;




    // ----------------RENDERING SKILLS SECTION-------------------//

    const skills = [
        { iconName: "guitarist.png", skillName: "Guitarist" },
        { iconName: "music.png", skillName: "Music Writer" },
        { iconName: "music transcription.png", skillName: "Music Transcription" },
        { iconName: "html.png", skillName: "HTML" },
        { iconName: "CSS.png", skillName: "CSS" },
        { iconName: "java-script.png", skillName: "JavaScript" },
        { iconName: "Git.png", skillName: "Git" },
        { iconName: "github (2).png", skillName: "GitHub" },
        { iconName: "visual-studio.png", skillName: "VScode" },
    ];

    const skillHTML = `
        <h2 class="section-name"><span class="line"></span> SKILLS</h2>
          
          <div class="skills-container d-flex">
          </div>
    `

    const skillSection = document.querySelector('#skills-section').innerHTML = skillHTML;

    let skillCard = ''
    skills.forEach(skill => {
        skillCard += `<div class="skill">
    <img src="images and icons/icons/${skill.iconName}" alt="" class="skill-icon">
    <p class="skill-name">${skill.skillName}</p>
  </div>`
    });
    const skillsContainer = document.querySelector('.skills-container').innerHTML = skillCard;




    // ----------------RENDERING CONTACT SECTION-------------------//
    const contactDetails = {
        heading: ' CONNECT WITH ME',
        subheading: 'Let’s Make Something Cool Together',
    }
    const contactHTML = `
    <h2 class="section-name">${contactDetails.heading}</h2>
    <p class="subheading">${contactDetails.subheading}</p>
    <form class="f-flex">
      <div class="input-container">
        <input class="input name" type="text" placeholder="Name" required />
        <input class="input email" type="email" placeholder="Email" required/>
      </div>

      <div class="txt-area-btn-container">
        <textarea name="Message-me" class="input" placeholder="Enter your Messsage"></textarea> 
        <button id="submit-btn">Submit</button>
      </div>
    
    </form>
  `;

    const contactSection = document.querySelector('#contact-section').innerHTML = contactHTML;
}