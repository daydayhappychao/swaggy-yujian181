import { Component, Vue } from 'vue-property-decorator';
import { observer } from 'mobx-vue';
import { toJS } from 'mobx';
import businessStore from '@/stores/courses';
import moment from 'moment';
import axios from 'axios';

@observer
@Component
export default class BusinessCate extends Vue {
  public addDialogShow = false;
  public addDialogForm =
    { title: '', brief_descript: '', serials: 1, pictures: '', teach_content: '', video_content: '', video_url: '', id: '', course_id: '' };
  public beforeCreate() {
    businessStore.getVideos(this.$route.params.id);
  }
  public render() {
    return (
      <el-container>
        <el-header>
          <div style={{ width: '100%' }}>
            <el-row gutter={20}>
              <el-col span={6} offset={18} style={{ textAlign: 'right' }}>
                <el-button
                  size='mini'
                  type='primary'
                  onClick={() => {
                    this.addDialogForm =
                      { title: '', brief_descript: '', serials: 1, pictures: '', teach_content: '', video_content: '', video_url: '', id: '', course_id: '' };
                    this.addDialogShow = true;
                  }}>新增影像</el-button>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-table
          data={toJS(businessStore.videos)}
          border
          style='width: 100%'>
          <el-table-column
            fixed
            prop='title'
            label='标题'>
          </el-table-column>
          <el-table-column
            prop='brief_descript'
            label='简介'>
          </el-table-column>
          <el-table-column
            prop='serials'
            label='课时数'>
          </el-table-column>
          <el-table-column
            label='图集'>
            {
              (scope: any) => (
                scope.row.pictures&&  scope.row.pictures.split(';').map((v: any, k: number) => (
                  <img style={{ maxWidth: '100%' }} src={`${v}`} />
                ))
              )
            }
          </el-table-column>
          <el-table-column
            prop='teach_content'
            label='教师内容'>
          </el-table-column>
          <el-table-column
            label='视频'>
            {
              (scope: any) => (
                <video style={{ maxWidth: '100%' }} controls>
                  <source src={`${scope.row.video_url}`} type="video/mp4" />
                  <source src={`${scope.row.video_url}`} type="video/ogg" />
                  您的浏览器不支持 video 标签。
                </video>
              )
            }
          </el-table-column>
          <el-table-column
            prop='video_content'
            label='视频内容'>
          </el-table-column>
          <el-table-column
            prop='create_date'
            label='创建时间'>
            {
              (scope: any) => (
                <span>{moment(scope.row.create_date).format('YYYY-MM-DD HH:mm:ss')}</span>
              )
            }
          </el-table-column>
          <el-table-column
            label='操作'
            width='200'
          >
            {
              (scope: any) =>
                <div >
                  <el-button
                    size='mini'
                    onClick={() => {
                      this.addDialogForm = scope.row;
                      this.addDialogShow = true;
                    }}
                  >编辑</el-button>
                  <el-button
                    size='mini'
                    type='danger'
                    onClick={businessStore.deleteVideo.bind(null, scope.row.id, this.$route.params.id)}
                  >删除</el-button>
                </div>
            }
          </el-table-column>
        </el-table >

        <el-dialog
          title={`${this.addDialogForm.id ? '編輯' : '新增'}影像`}
          visible={this.addDialogShow}
          width='70%'
          before-close={() => {
            this.addDialogForm =
              { title: '', brief_descript: '', serials: 1, pictures: '', teach_content: '', video_content: '', video_url: '', id: '', course_id: '' };
            this.addDialogShow = false;
          }}
        >
          <el-form label-position='right' label-width='80px' model={this.addDialogForm} ref='addDialogShow' >
            <el-form-item label='标题'
              prop='title'
              rules={[
                { required: true, message: '请输入标题' },
              ]}>
              <el-input v-model={this.addDialogForm.title}></el-input>
            </el-form-item>

            <el-form-item label='简介'
              prop='brief_descript'
              rules={[
                { required: true, message: '请输入简介' },
              ]}>
              <el-input v-model={this.addDialogForm.brief_descript}></el-input>
            </el-form-item>
            <el-form-item label='课时数'
              prop='serials'
              rules={[
                { required: true, message: '请输入课时数' },
              ]}>
              <el-input v-model={this.addDialogForm.serials}></el-input>
            </el-form-item>

            <el-form-item label='图集'>
              <el-button
                size='mini'
                type='primary'
                onClick={() => {
                  (this.$refs.file as any).click();
                }}
              >上传图片</el-button>
              {
                this.addDialogForm.pictures && this.addDialogForm.pictures.split(';').map((v, k) => (
                  <img style='width:100%;' onClick={(ev: any) => {
                    this.addDialogForm.pictures = this.addDialogForm.pictures.replace(';' + ev.target.getAttribute('src'), '');
                  }} src={v} />
                ))
              }
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
                      this.addDialogForm.pictures += ';http://' + window.location.host + '/public/' + res.data.message;
                    }
                  });
                }
              }} ref='file' style={{ display: 'none' }} />
            </el-form-item>


            <el-form-item label='教师内容'
              prop='teach_content'
              rules={[
                { required: true, message: '请输入教师内容' },
              ]}>
              <el-input v-model={this.addDialogForm.teach_content}></el-input>
            </el-form-item>
            <el-form-item label='视频'>
              <el-button
                size='mini'
                type='primary'
                onClick={() => {
                  (this.$refs.file2 as any).click();
                }}
              >上传视频</el-button>
              {
                this.addDialogForm.video_url &&
                <video style={{ maxWidth: '100%' }} controls>
                  <source src={`${this.addDialogForm.video_url}`} type="video/mp4" />
                  <source src={`${this.addDialogForm.video_url}`} type="video/ogg" />
                  您的浏览器不支持 video 标签。
              </video>
              }
              <input type='file' onChange={(ev: any) => {
                if (ev.target.files) {
                  const form = new FormData();
                  form.append('file', ev.target.files[0]);
                  axios.post('/api/uploadMP4', form, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  }).then((res) => {
                    if (res.data.status === 0) {
                      this.addDialogForm.video_url = 'http://' + window.location.host + '/public/' + res.data.message;
                    }
                  });
                }
              }} ref='file2' style={{ display: 'none' }} />
            </el-form-item>

            <el-form-item label='视频内容'
              prop='video_content'
              rules={[
                { required: true, message: '请输入视频内容' },
              ]}>
              <el-input v-model={this.addDialogForm.video_content}></el-input>
            </el-form-item>

            <el-form-item>
              <span >
                <el-button onClick={() => { this.addDialogShow = false; }}>取 消</el-button>
                <el-button type='primary' onClick={() => {
                  (this.$refs.addDialogShow as Vue).validate((valid: boolean) => {
                    if (valid) {
                      businessStore.createVideos(this.addDialogForm, this.$route.params.id);
                      // businessStore.createCate(this.addDialogForm.name,
                      //   this.addDialogForm.weight,
                      //   this.addDialogForm.id);
                      this.addDialogForm =
                        { title: '', brief_descript: '', serials: 1, pictures: '', teach_content: '', video_content: '', video_url: '', id: '', course_id: '' };
                      this.addDialogShow = false;
                    }
                  });
                }}>确 定</el-button>
              </span>
            </el-form-item>
          </el-form>
        </el-dialog>

      </el-container>
    );
  }
}
