
/**
 * Components
 * the structure of the components is not defined, the only rule is. 
 * to be mounted needs to be a function
 */


const Header = () => {
    const header = document.createElement('header')
    const title = document.createElement('h1')

    title.innerText = 'Test Header'
    header.append(title)

    return header;
}


/**
 * to use the proxy objects needs to be inside a container that returns a function after has been called
 * that function has parameter that is called state... `state` is a function to create the `proxy` object
 */


const Content = ({ children } = {}) => (state) => {
    const main = document.createElement('main')
    if (children) main.append(...children.map(child => child(state)))
    return main;
}

const Button = ({ text = 'Button', onClick }) => (useState) => {
    const button = document.createElement('button')

    // to observe changes inside the proxy object by the momento is necessary to evaluate what prop is setted
    const state = useState({ text }, (prop) =>{
        if(prop == 'text'){
            button.innerText = state.text
        }
    })

    button.innerText = state.text
    button.onclick = (e) => onClick(state, e)
    return button
}

const ContentBuilded = Content({
    children: [
        Button({
            text: 1,
            onClick(state) {
              state.text++
            }
        })
    ]
})

/**
 * Mounting on the dom
 */


const app = new App(
    '#app' //selector 
);



app
    .mount(Header)
    .mount(ContentBuilded, true) // the true value is to indicate that content has subscriptions
    .render()


// all of this is only a concept, with the purpose that is explain how could work 
// this kind of logic with javascript