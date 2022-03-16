function loadSlideshow(){
    // Get Slideshow element assigned as id="slideshow"
    const slideshow = document.getElementById("slideshow");

    // Get all secctions added to the slideshow as childrens
    const sections = slideshow.children;

    // Check slideshow has child elements...
    if( sections.length == 0){
        console.log("ERROR: No child elements defined in the slideshow.");
        return;
    }

    const dotBlock = document.createElement("div");
    dotBlock.setAttribute("id", "slideshow_dots_block");
    slideshow.appendChild(dotBlock);
    for (let index = 0; index < sections.length-1; index++) { // sections.length-1 because ignore the dotBlock just added
        sections[index].setAttribute("id", "slideshow_section_"+index);
        sections[index].classList.add("slideshow_section");

        var dot = document.createElement("div");
        dot.setAttribute("id", "slideshow_dot_section_"+index);
        dot.classList.add("slideshow_dot_section");
        dotBlock.appendChild(dot);
    }
}