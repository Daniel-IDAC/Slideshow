var slideshows = new Array();
var animationSlideshowIntervals = new Array();

var moving = false;
var originX = 0;
var endX = 0;

function startMove(){
    moving = true;
    if(event.type == "touchstart"){
        originX = event.touches[0].clientX;
    }
    else if(event.type == "mousedown"){
        originX = event.clientX;
    }
    
}
function inMove(id){
    if(moving){
        if(event.type == "touchmove"){
            endX = event.touches[0].clientX;
        }
        else if(event.type == "mousemove"){
            endX = event.clientX;
        }

        // Get all active sections and dots
        var activeSections = document.getElementById(id).getElementsByClassName("slideshow_section active");
        var dif = originX - endX;
        if( dif > 50 ){ activeSections[0].style.marginLeft = "-2em"; }
        else if( dif < -50 ){ activeSections[0].style.marginLeft = "2em"; }
        else{ activeSections[0].style.marginLeft = "0"; }
    }
}
function endMove(id){
    if(endX != 0){
        var activeSections = document.getElementById(id).getElementsByClassName("slideshow_section active");
        var dif = originX - endX;
        if( dif > 50 ){ activeSections[0].style.marginLeft = "0"; moveSection(id, 1); }
        if( dif < -50 ){ activeSections[0].style.marginLeft = "0"; moveSection(id, -1); }
    }
    
    moving = false;
    originX = 0;
    endX = 0;
}

function animationSlideshow(id){
    var sections = document.getElementById(id).getElementsByClassName("slideshow_section");
    var currentIndex = 0;

    for (let index = 0; index < sections.length; index++) {
        if(sections[index].classList.contains("active")){
            currentIndex = index;
        }
    }
    if( currentIndex == (sections.length - 1) ){
        currentIndex = 0;
    }
    else{
        currentIndex++;
    }
    goToSection(id, currentIndex);
}
function playAnimationSlideshow(id){
    var index = slideshows.indexOf(id);
    if(!animationSlideshowIntervals[index]){
        stopAnimationSlideshow(id)
        animationSlideshowIntervals[index] = setInterval(function(){animationSlideshow(id)}, 5000);
    }
}

function stopAnimationSlideshow(id){
    var index = slideshows.indexOf(id);
    if(animationSlideshowIntervals[index]){
        clearInterval(animationSlideshowIntervals[index]);
        animationSlideshowIntervals[index] = null;
    }
}


function loadSlideshow(id, autoPlay){
    // Add new slideshow into the array
    slideshows.push(id);
    const index = slideshows.indexOf(id);

    // Get Slideshow element assigned as id="slideshow"
    const slideshow = document.getElementById(id);
    slideshow.classList.add("slideshow");

    // Check slideshow has child elements...
    if(slideshow.children.length == 0){
        console.log("ERROR: No child elements defined in the slideshow.");
        return;
    }

    // Create sections wrap
    const sectionsWrap = document.createElement("div");
    sectionsWrap.classList.add("slideshow_sections_block");
    // Add touch/click event listeners
    sectionsWrap.addEventListener("touchstart", function(){startMove()});
    sectionsWrap.addEventListener("mousedown", function(){startMove()});

    sectionsWrap.addEventListener("touchmove", function(){inMove(id)});
    sectionsWrap.addEventListener("mousemove", function(){inMove(id)});

    sectionsWrap.addEventListener("touchend", function(){endMove(id)});
    sectionsWrap.addEventListener("mouseup", function(){endMove(id)});

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
    dotBlock.classList.add("slideshow_dots_block");
    slideshow.appendChild(dotBlock);
    for (let index = 0; index < sections.length; index++) {
        //sections[index].setAttribute("id", "slideshow_section_"+index);
        sections[index].classList.add("slideshow_section");
        if(index > 0){
            sections[index].classList.add("stackR");
        }
        else{
            sections[index].classList.add("active");
        }

        var dot = document.createElement("div");
        dot.classList.add("slideshow_dot_section");
        if(index == 0){ dot.classList.add("active"); } // Set ative to first section dot
        dot.setAttribute("onclick","goToSection('"+id+"',"+index+");");
        dotBlock.appendChild(dot);
    }

    // Create move icons
    const moveLeftBlock = document.createElement("div");
    moveLeftBlock.classList.add("slideshow_move_block");
    moveLeftBlock.classList.add("slideshow_moveLeft_block");
    moveLeftBlock.classList.add("disabled");
    moveLeftBlock.setAttribute("onclick","moveSection('"+id+"',-1);");
    slideshow.appendChild(moveLeftBlock);

    var moveLeftIcon = document.createElement("div");
    moveLeftIcon.classList.add("slideshow_move_icon");
    moveLeftIcon.classList.add("slideshow_moveLeft_icon");
    moveLeftBlock.appendChild(moveLeftIcon);


    const moveRightBlock = document.createElement("div");
    moveRightBlock.classList.add("slideshow_move_block");
    moveRightBlock.classList.add("slideshow_moveRight_block");
    moveRightBlock.setAttribute("onclick","moveSection('"+id+"',+1);");
    slideshow.appendChild(moveRightBlock);

    var moveRightIcon = document.createElement("div");
    moveRightIcon.classList.add("slideshow_move_icon");
    moveRightIcon.classList.add("slideshow_moveRight_icon");
    moveRightBlock.appendChild(moveRightIcon);

    // Add hover event listeners
    if(autoPlay){
        sectionsWrap.addEventListener("mouseenter", function(){stopAnimationSlideshow(id)});
        sectionsWrap.addEventListener("mouseleave", function(){playAnimationSlideshow(id)});
        animationSlideshowIntervals[index] = setInterval(function(){animationSlideshow(id)}, 5000);
    }
    /*
    else{
        stopAnimationSlideshow();
    }
    */
}

function goToSection(id, sectionId){
    
    // Get all sections and dots
    var sections = document.getElementById(id).getElementsByClassName("slideshow_section");
    var sectionDots = document.getElementById(id).getElementsByClassName("slideshow_dot_section");
    // Hidden all sections
    for (let index = 0; index < sections.length; index++) {
        sectionDots[index].classList.remove("active");
        sections[index].classList.remove("active");
        sections[index].classList.remove("stackL");
        sections[index].classList.remove("stackR");
        if( sectionId > index ){ sections[index].classList.add("stackL"); }
        if( sectionId < index ){ sections[index].classList.add("stackR"); }
    }

    // Get selected section to show by sectionId and dot
    /*
    const section = document.getElementById("slideshow_section_"+sectionId);
    const sectionDot = document.getElementById("slideshow_dot_section_"+sectionId);
    */
    const section = sections[sectionId];
    const sectionDot = sectionDots[sectionId];

    // Show selected section
    section.classList.add("active");
    sectionDot.classList.add("active");

    // Enabled/Disabled move buttons
    enabledMoveButton(id, sectionId);
}

function moveSection(id, direction){
    // Get all active sections and dots
    // var activeSections = document.getElementsByClassName("slideshow_section active");
   
    /*
    const activeSectionId = activeSections[0].id.split("_");
    const activeSectionIndex = activeSectionId[2];
    const activeSection = activeSections[0];
    */

    // Get all sections and dots
    var sections = document.getElementById(id).getElementsByClassName("slideshow_section");
    var sectionDots = document.getElementById(id).getElementsByClassName("slideshow_dot_section");

    // Get current active section index
    for (let index = 0; index < sections.length; index++) {
        if(sections[index].classList.contains("active")){
            var activeSectionIndex = index;
            var activeSection = sections[index];
        }
    }

    // Check if newSectionIndex is out of bones
    var newSectionIndex = parseInt(activeSectionIndex) + parseInt(direction);
    if(newSectionIndex < 0 || newSectionIndex == sections.length){
        return;
    }
    
    // Hidden all sections
    for (let index = 0; index < sections.length; index++) {
        sections[index].classList.remove("active");
        sectionDots[index].classList.remove("active");
    }
    
    // Get new section
    activeSection.classList.remove("active");
    
    // Get selected section to show by sectionId and dot
    /*
    const section = document.getElementById("slideshow_section_"+newSectionIndex);
    const sectionDot = document.getElementById("slideshow_dot_section_"+newSectionIndex);
    */
    const section = sections[newSectionIndex];
    const sectionDot = sectionDots[newSectionIndex];
    sectionDot.classList.add("active");

    // Check movement direction
    if( direction === 1 ){ // Right icon
        activeSection.classList.add("stackL");
        section.classList.remove("stackR");
        section.classList.add("active");
    }
    else{ // Left icon
        activeSection.classList.add("stackR");
        section.classList.remove("stackL");
        section.classList.add("active");
    }

    // Enabled/Disabled move buttons
    enabledMoveButton(id, newSectionIndex);
}

function enabledMoveButton(id, index){
    // Get all sections and dots
    var sections = document.getElementById(id).getElementsByClassName("slideshow_section");
    
    // Enabled/Disabled move buttons
    const moveLeft = document.getElementById(id).getElementsByClassName("slideshow_moveLeft_block")[0];
    const moveRight = document.getElementById(id).getElementsByClassName("slideshow_moveRight_block")[0];
    moveLeft.classList.remove("disabled");
    moveRight.classList.remove("disabled");

    if( index == 0 ){ moveLeft.classList.add("disabled"); }
    if( index == sections.length - 1 ){ moveRight.classList.add("disabled"); }
}