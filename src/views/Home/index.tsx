import { Vue, Component } from 'vue-property-decorator';
import { observer } from 'mobx-vue';

@observer
@Component
export default class Home extends Vue {
  public render() {
    return (
      <div>
        566
      </div>
    );
  }
}
