const allAccordions = [];

class Acordion{
    constructor(ele){
        this.detailElement = ele;
        this.detailElement.style.overflow = "hidden"

        this.isClosed = true;
        this.isOpen = false;

        this.summary = ele.querySelector('summary')
        this.summary.style.listStyle = "none"
        this.summary.addEventListener('click',(e) => this.onclick(e))

        this.content = ele.querySelector('.content')
        
        this.animation = null;

        this.icon = ele.querySelector('.icon')

        this.allInstances = allAccordions;
    }
    open(){
       
        // this.detailElement.open = true;
        
        // setting up keyframes and options to use the WAAPI animate method
        const animScroll = [
            {height : `${this.summary.offsetHeight}px`},
            {height : `${this.content.offsetHeight + this.summary.offsetHeight}px`}
        ]
        
        const animScrollTiming = {
            duration: 200,
            iterations: 1,
        }

        this.icon.classList.remove('rotateDown') //adding class to the arrow icons for animation
        this.icon.classList.add('rotateUp')

        this.animation = this.detailElement.animate(animScroll,animScrollTiming)
        this.detailElement.open = true;
       
        this.isOpen = true;
        this.isClosed = false;

        this.allInstances.forEach(ele => { //this was particullarly trick, 
            //close any other instance of the accordion class if its open when i open another(i.e this)
            if(ele != this && ele.isOpen === true){
                ele.close()
            }
        })
    }

    close(){
        console.log('here',this.summary.offsetHeight)

        const animScroll = [
            {height : `${this.summary.offsetHeight + this.content.offsetHeight}px`},
            {height : `${this.summary.offsetHeight}px`}
        ]
        
        const animScrollTiming = {
            duration: 200,
            iterations: 1
        }

        this.icon.classList.remove('rotateUp')
        this.icon.classList.add('rotateDown')

        this.animation = this.detailElement.animate(animScroll,animScrollTiming)

        this.animation.onfinish = () => {
            this.detailElement.open = false;
        }

        this.isOpen = false;
        this.isClosed = true;
    }

    onclick(e){
        e.preventDefault()
        console.log(this.content.style.height)
        if(this.isClosed === true){
             this.animation?this.animation.cancel() : null
             this.open()
        }
        else{
            this.animation?this.animation.cancel() : null
            this.close()
        }
    }
}

class Nav{
    constructor(ele){
      this.nav_btn = ele.querySelector('.nav__btn')
      this.navlines = ele.querySelectorAll('.line')

      this.slide = ele.querySelector('.nav__content')

      this.nav_btn.addEventListener('click',(e) => this.handleClick(e))

    //   this.isOpen = false;
      this.isClosed = true;
    }

    open(e){
        this.navlines.forEach((ele,i)=>{
            ele.classList.remove('nav-line-' + this.numToText(i) + '-close')
            ele.classList.add('nav-line-' + this.numToText(i) + '-open')


        })
        this.slide.classList.remove('slideOut')
        this.slide.classList.add('slideIn')

        this.isClosed = false
    }

    close(e){
        console.log('here')
        this.navlines.forEach((ele,i)=>{
            ele.classList.remove('nav-line-' + this.numToText(i) + '-open')
            ele.classList.add('nav-line-' + this.numToText(i) + '-close')
        })
        this.slide.classList.remove('slideIn')
        this.slide.classList.add('slideOut')

        this.isClosed = true
    }

    handleClick(e){
        console.log('clicked')
       if(this.isClosed){
          this.open(e)
       } 
       else{
          this.close(e)
       }
    }

    numToText(num){
       switch (num) {
        case 0:
            return 'one'
            break;
        case 1:
          return 'two'
        break;
       
        case 2:
          return 'three'
        break;
        default:
            break;
       }
    }
}

const Details =  document.querySelectorAll('details')

Details.forEach((ele)=>{
   allAccordions.push(new Acordion(ele))
})

const navElement =  document.querySelector('.nav')
const nav = new Nav(navElement)

