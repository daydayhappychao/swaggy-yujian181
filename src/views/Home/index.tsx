import { Vue, Component } from 'vue-property-decorator';
import { observer } from 'mobx-vue';
import axios from 'axios';

@observer
@Component
export default class Home extends Vue {
  public avatar = '';
  public beforeCreate() {
    axios.get('/api/getAvatar').then(res => {
      this.avatar = res.data.url || '';
    });
  }
  public render() {
    return (
      <div>
        <el-button
          size='mini'
          type='primary'
          onClick={() => {
            (this.$refs.file as any).click();
          }}
        >上传图片</el-button>
        <el-button
          size='mini'
          type='primary'
          style={{ marginLeft: '20px' }}
          onClick={() => {
            axios.post('/api/createAvatar', { url: this.avatar }).then(res => {
              this.avatar = res.data.url || '';
              this.$message('保存成功');
            });
          }}
        >保存图片</el-button>
        <div style={{ marginTop: '20px' }}>
          <img style='width:40%;' src={this.avatar ? `/public/${this.avatar}` : ''} />
        </div>
        <input type='file' onChange={(ev: any) => {
          if (ev.target.files) {
            const form = new FormData();
            form.append('file', ev.target.files[0]);
            axios.post('/api/upload', form, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }).then((res) => {
              if (res.data.status === 0) {
                this.avatar = res.data.message;
              }
            });
          }
        }} ref='file' style={{ display: 'none' }} />
      </div>
    );
  }
}
