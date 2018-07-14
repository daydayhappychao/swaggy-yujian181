import {Vue,Component} from 'vue-property-decorator';
import {observer} from 'mobx-vue';
import demoStore from './stores/demoStore';

@observer
@Component
export default class App extends Vue{
    public render(){
        return (
            <div 
                style={{color: demoStore.color}} 
                onClick={demoStore.changeColor}>
                hi
            </div>
        );
    }
}