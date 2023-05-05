const menuBars = document.getElementById('menu_bars')
const overlay = document.getElementById('overlay')
const navHome = document.getElementById('nav_home')
const navAbout = document.getElementById('nav_about')
const navSkills = document.getElementById('nav_skills')
const navProjects = document.getElementById('nav_projects')
const navContact = document.getElementById('nav_contact')

//const navItems = ['yellow', 'orange', 'teal', 'blue', 'purple']

/* Control Navigation Animation */
/*function navAnimation (direction1, direction2) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(
      `slide_${direction1}`._navItems[i],
      `slide_${direction2}`._navItems[i]
    )
  })
}*/

function toggleMenu () {
  /* Toggle menu bars open / close */
  menuBars.classList.toggle('change')
  /*
  if (menuBars.classList.contains('change')) {
    menuBars.classList.remove('change')
  } else {
    menuBars.classList.add('change')
  }*/

  //Toggle: Menu Active
  overlay.classList.toggle('active_overlay')
  if (overlay.classList.contains('active_overlay')) {
    /* Animate in - overlay */
    //overlay.classList.remove('overlay_slide_left')
    //overlay.classList.add('overlay_slide_right')
    overlay.classList.replace('overlay_slide_left', 'overlay_slide_right')
    //navAnimation('out', 'in')

    /* Animate in - nav items */
    //navHome.classList.remove('slide_out_yellow')
    //navHome.classList.add('slide_in_yellow')
    navHome.classList.replace('slide_out_yellow', 'slide_in_yellow')

    //navAbout.classList.remove('slide_out_orange')
    //navAbout.classList.add('slide_in_orange')
    navAbout.classList.replace('slide_out_orange', 'slide_in_orange')

    //navSkills.classList.remove('slide_out_teal')
    //navSkills.classList.add('slide_in_teal')
    navSkills.classList.replace('slide_out_teal', 'slide_in_teal')

    //navProjects.classList.remove('slide_out_blue')
    //navProjects.classList.add('slide_in_blue')
    navProjects.classList.replace('slide_out_blue', 'slide_in_blue')

    //navContact.classList.remove('slide_out_purple')
    //navContact.classList.add('slide_in_purple')
    navContact.classList.replace('slide_out_purple', 'slide_in_purple')
  } else {
    /* Animate out - overlay */
    //overlay.classList.remove('overlay_slide_right')
    //overlay.classList.add('overlay_slide_left')
    overlay.classList.replace('overlay_slide_right', 'overlay_slide_left')
    //navAnimation('in', 'out')
    /* Animate out - nav items */
    //navHome.classList.remove('slide_in_yellow')
    //navHome.classList.add('slide_out_yellow')
    navHome.classList.replace('slide_in_yellow', 'slide_out_yellow')

    //navAbout.classList.remove('slide_in_orange')
    //navAbout.classList.add('slide_out_orange')
    navAbout.classList.replace('slide_in_orange', 'slide_out_orange')

    //navSkills.classList.add('slide_out_teal')
    //navSkills.classList.remove('slide_in_teal')
    navSkills.classList.replace('slide_in_teal', 'slide_out_teal')

    //navProjects.classList.add('slide_out_blue')
    //navProjects.classList.remove('slide_in_blue')
    navProjects.classList.replace('slide_in_blue', 'slide_out_blue')

    //navContact.classList.add('slide_out_purple')
    //navContact.classList.remove('slide_in_purple')
    navContact.classList.replace('slide_in_purple', 'slide_out_purple')
  }
}

/* Event Listeners */
menuBars.addEventListener('click', toggleMenu)
overlay.addEventListener('click', toggleMenu)
//navHome.addEventListener('click', toggleMenu)
//navAbout.addEventListener('click', toggleMenu)
//navSkills.addEventListener('click', toggleMenu)
//navProjects.addEventListener('click', toggleMenu)
//navContact.addEventListener('click', toggleMenu)

const navList = [navHome, navAbout, navSkills, navProjects, navContact]
navList.forEach(nav => {
  nav.addEventListener('click', toggleMenu)
})
