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
    //sections[0].classList.add("active");

    // Create dots
    const dotBlock = document.createElement("div");
    dotBlock.setAttribute("id", "slideshow_dots_block");
    slideshow.appendChild(dotBlock);
    for (let index = 0; index < sections.length; index++) {
        sections[index].setAttribute("id", "slideshow_section_"+index);
        sections[index].classList.add("slideshow_section");
        if(index > 0){
            sections[index].classList.add("stackR");
        }
        else{
            sections[index].classList.add("active");
        }

        var dot = document.createElement("div");
        dot.setAttribute("id", "slideshow_dot_section_"+index);
        dot.classList.add("slideshow_dot_section");
        if(index == 0){ dot.classList.add("active"); } // Set ative to first section dot
        dot.setAttribute("onclick","goToSection("+index+");");
        dotBlock.appendChild(dot);
    }

    // Create move icons
    const moveLeftBlock = document.createElement("div");
    moveLeftBlock.setAttribute("id", "slideshow_moveLeft_block");
    moveLeftBlock.classList.add("slideshow_move_block");
    moveLeftBlock.classList.add("disabled");
    moveLeftBlock.setAttribute("onclick","moveSection(-1);");
    slideshow.appendChild(moveLeftBlock);

    var moveLeftIcon = document.createElement("div");
    moveLeftIcon.setAttribute("id", "slideshow_moveLeft_icon");
    moveLeftIcon.classList.add("slideshow_move_icon");
    moveLeftBlock.appendChild(moveLeftIcon);


    const moveRightBlock = document.createElement("div");
    moveRightBlock.setAttribute("id", "slideshow_moveRight_block");
    moveRightBlock.classList.add("slideshow_move_block");
    moveRightBlock.setAttribute("onclick","moveSection(+1);");
    slideshow.appendChild(moveRightBlock);

    var moveRightIcon = document.createElement("div");
    moveRightIcon.setAttribute("id", "slideshow_moveRight_icon");
    moveRightIcon.classList.add("slideshow_move_icon");
    moveRightBlock.appendChild(moveRightIcon);
}

function goToSection(sectionId){
    // Get all sections and dots
    var sections = document.getElementsByClassName("slideshow_section");
    var sectionDots = document.getElementsByClassName("slideshow_dot_section");

    // Get selected section to show by sectionId and dot
    const section = document.getElementById("slideshow_section_"+sectionId);
    const sectionDot = document.getElementById("slideshow_dot_section_"+sectionId);

    // Hidden all sections
    for (let index = 0; index < sections.length; index++) {
        sections[index].classList.remove("active");
        sectionDots[index].classList.remove("active");
    }

    // Show selected section
    section.classList.add("active");
    sectionDot.classList.add("active");
}

function moveSectionOld(direction){
    // Get all active sections and dots
    var activeSections = document.getElementsByClassName("slideshow_section active");
    // Get current active section index
    const activeSectionId = activeSections[0].id.split("_");
    const activeSectionIndex = activeSectionId[2];
    
    // Get all sections and dots
    var sections = document.getElementsByClassName("slideshow_section");
    var sectionDots = document.getElementsByClassName("slideshow_dot_section");

    // Hidden all sections
    for (let index = 0; index < sections.length; index++) {
        sections[index].classList.remove("active");
        sectionDots[index].classList.remove("active");
    }

    var newSectionIndex = parseInt(activeSectionIndex) + parseInt(direction);
    // Get selected section to show by sectionId and dot
    const section = document.getElementById("slideshow_section_"+newSectionIndex);
    const sectionDot = document.getElementById("slideshow_dot_section_"+newSectionIndex);
    
    // Show selected section
    section.classList.add("active");
    sectionDot.classList.add("active");

    // Enabled/Disabled move buttons
    const moveLeft = document.getElementById("slideshow_moveLeft_block");
    const moveRight = document.getElementById("slideshow_moveRight_block");
    moveLeft.classList.remove("disabled");
    moveRight.classList.remove("disabled");
    console.log(sections.length);
    if( newSectionIndex == 0 ){ moveLeft.classList.add("disabled"); }
    if( newSectionIndex == sections.length-1 ){ moveRight.classList.add("disabled"); }
}

function moveSection(direction){
    // Get all active sections and dots
    var activeSections = document.getElementsByClassName("slideshow_section active");
    // Get current active section index
    const activeSectionId = activeSections[0].id.split("_");
    const activeSectionIndex = activeSectionId[2];
    const activeSection = activeSections[0];
    
    // Get all sections and dots
    var sections = document.getElementsByClassName("slideshow_section");
    var sectionDots = document.getElementsByClassName("slideshow_dot_section");

    // Hidden all sections
    for (let index = 0; index < sections.length; index++) {
        sections[index].classList.remove("active");
        sectionDots[index].classList.remove("active");
    }
    
    // Get new section
    activeSection.classList.remove("active");
    var newSectionIndex = parseInt(activeSectionIndex) + parseInt(direction);

    // Get selected section to show by sectionId and dot
    const section = document.getElementById("slideshow_section_"+newSectionIndex);
    const sectionDot = document.getElementById("slideshow_dot_section_"+newSectionIndex);
    sectionDot.classList.add("active");

    // Check movement direction
    console.log("Direcion "+direction);
    if( direction === 1 ){ // Right icon
        console.log("Boton derecho");
        activeSection.classList.add("stackL");
        section.classList.remove("stackR");
        section.classList.add("active");
    }
    else{ // Left icon
        console.log("Boton izquierdo");
        activeSection.classList.add("stackR");
        section.classList.remove("stackL");
        section.classList.add("active");
    }

    // Enabled/Disabled move buttons
    const moveLeft = document.getElementById("slideshow_moveLeft_block");
    const moveRight = document.getElementById("slideshow_moveRight_block");
    moveLeft.classList.remove("disabled");
    moveRight.classList.remove("disabled");
    
    if( newSectionIndex == 0 ){ moveLeft.classList.add("disabled"); }
    if( newSectionIndex == sections.length-1 ){ moveRight.classList.add("disabled"); }
}