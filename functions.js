function loadSlideshow(){
    // Get Slideshow element assigned as id="slideshow"
    const slideshow = document.getElementById("slideshow");

    // Check slideshow has child elements...
    if(slideshow.children.length == 0){
        console.log("ERROR: No child elements defined in the slideshow.");
        return;
    }

    // Create sections wrap
    const sectionsWrap = document.createElement("div");
    sectionsWrap.setAttribute("id", "slideshow_sections_block");
    // Move all slideshow child elements to sections wrap
    while(slideshow.children.length > 0){
        sectionsWrap.appendChild(slideshow.firstChild);
    }
    slideshow.appendChild(sectionsWrap);

    // Get all secctions added to the slideshow as childrens moved to sectionsWrap
    const sections = sectionsWrap.children;
    sections[0].classList.add("active");

    // Create dots
    const dotBlock = document.createElement("div");
    dotBlock.setAttribute("id", "slideshow_dots_block");
    slideshow.appendChild(dotBlock);
    for (let index = 0; index < sections.length; index++) { // sections.length-1 because ignore the dotBlock just added
        sections[index].setAttribute("id", "slideshow_section_"+index);
        sections[index].classList.add("slideshow_section");

        var dot = document.createElement("div");
        dot.setAttribute("id", "slideshow_dot_section_"+index);
        dot.classList.add("slideshow_dot_section");
        if(index == 0){ dot.classList.add("active"); } // Set ative to first section dot
        dotBlock.appendChild(dot);
    }

    // Create move icons
    const moveLeftBlock = document.createElement("div");
    moveLeftBlock.setAttribute("id", "slideshow_moveLeft_block");
    moveLeftBlock.classList.add("slideshow_move_block");
    slideshow.appendChild(moveLeftBlock);

    var moveLeftIcon = document.createElement("div");
    moveLeftIcon.setAttribute("id", "slideshow_moveLeft_icon");
    moveLeftIcon.classList.add("slideshow_move_icon");
    moveLeftBlock.appendChild(moveLeftIcon);


    const moveRightBlock = document.createElement("div");
    moveRightBlock.setAttribute("id", "slideshow_moveRight_block");
    moveRightBlock.classList.add("slideshow_move_block");
    slideshow.appendChild(moveRightBlock);

    var moveRightIcon = document.createElement("div");
    moveRightIcon.setAttribute("id", "slideshow_moveRight_icon");
    moveRightIcon.classList.add("slideshow_move_icon");
    moveRightBlock.appendChild(moveRightIcon);
}