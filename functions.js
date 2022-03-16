function loadSlideshow(){
    // Get Slideshow element assigned as id="slideshow"
    const slideshow = document.getElementById("slideshow");

    // Check slideshow has child elements...
    if( slideshow.children.length == 0){
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

    const dotBlock = document.createElement("div");
    dotBlock.setAttribute("id", "slideshow_dots_block");
    slideshow.appendChild(dotBlock);
    for (let index = 0; index < sections.length; index++) { // sections.length-1 because ignore the dotBlock just added
        sections[index].setAttribute("id", "slideshow_section_"+index);
        sections[index].classList.add("slideshow_section");

        var dot = document.createElement("div");
        dot.setAttribute("id", "slideshow_dot_section_"+index);
        dot.classList.add("slideshow_dot_section");
        dotBlock.appendChild(dot);
    }
}