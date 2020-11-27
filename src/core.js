
class App {
    constructor(selector) {
        this.__selector = selector
        this.__appNode = this._init()

        /**
         * @type {{[key:string]: Element}}
         */
        this.__nodes = {};
    }
  
    _init() {
        return document.querySelector(this.__selector)
    }

    _createState(value = {}, actions = () => null) {
        return new Proxy(value, {
            set(object, prop, newVal) {
                object[prop] = newVal
                actions(prop)
            }
        })
    }
    mount(component, subscribe = false) {
        const element = component(subscribe ? this._createState : undefined);

        this.__nodes[element.tagName + element.id] = element;
        return this
    }

    render() {
        const nodes = Object.keys(this.__nodes).map(key => this.__nodes[key]);
        this.__appNode.append(...nodes)
    }
}
