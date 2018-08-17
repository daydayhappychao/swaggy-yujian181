import { Component, Vue } from 'vue-property-decorator';
import { observer } from 'mobx-vue';
import { toJS } from 'mobx';
import coursesStore from '@/stores/courses';
import axios from 'axios';
import { Button } from 'element-ui';

@observer
@Component
export default class Users extends Vue {
  public addDialogShow = false;
  public page = 1;
  public addDialogForm: { avatar: string, description: string, title: string, id?: string } =
    { avatar: '', description: '', title: '' };
  public beforeCreate() {
    coursesStore.getCourses(1);
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
                    this.addDialogForm = { avatar: '', description: '', title: '' };
                    this.addDialogShow = true;
                  }}>新增课程</el-button>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-table
          data={toJS(coursesStore.courses)}
          border
          style='width: 100%'>
          <el-table-column
            fixed
            prop='id'
            label='id'>
          </el-table-column>
          <el-table-column
            prop='avatar'
            label='封面图'>
            {
              (scope: any) => (
                <img style={{ maxWidth: '100%' }} src={`${scope.row.avatar}`} />
              )
            }
          </el-table-column>
          <el-table-column
            prop='title'
            label='标题'>
          </el-table-column>
          <el-table-column
            prop='description'
            label='简介'>
          </el-table-column>
          <el-table-column
            prop='play_times'
            label='播放次数'>
          </el-table-column>
          <el-table-column
            prop='total_serials'
            label='集数'>
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
                      this.$router.push('/video/' + scope.row.id)
                    }}
                  >查看详情</el-button>
                  <el-button
                    size='mini'
                    onClick={() => {
                      this.addDialogForm = { id: scope.row.id, avatar: scope.row.avatar, description: scope.row.description, title: scope.row.title };
                      this.addDialogShow = true;
                    }}
                  >编辑</el-button>
                  <el-button
                    size='mini'
                    type='danger'
                    onClick={() => {
                      coursesStore.delete(scope.row.id, this.page);
                    }}
                  >删除</el-button>
                </div>
            }
          </el-table-column>
        </el-table >

        <el-dialog
          title={`${this.addDialogForm.id ? '編輯' : '新增'}课程`}
          visible={this.addDialogShow}
          width='70%'
          before-close={() => { this.addDialogForm = { avatar: '', description: '', title: '' }; this.addDialogShow = false; }}
        >
          <el-form label-position='right' label-width='80px' model={this.addDialogForm} ref='addDialogShow' >
            <el-form-item label='课程名称'
              prop='title'
              rules={[
                { required: true, message: '请输入课程名称' },
              ]}>
              <el-input v-model={this.addDialogForm.title}></el-input>
            </el-form-item>
            <el-form-item label='课程简介'
              prop='description'
              rules={[
                { required: true, message: '请输入课程简介' },
              ]}>
              <el-input v-model={this.addDialogForm.description}></el-input>
            </el-form-item>
            <el-form-item label='封面图'>
              <el-button
                size='mini'
                type='primary'
                onClick={() => {
                  (this.$refs.file as any).click();
                }}
              >上传图片</el-button>
              <img style='width:100%;' src={this.addDialogForm.avatar} />
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
                      this.addDialogForm.avatar = 'http://' + window.location.host + '/public/' + res.data.message;
                    }
                  });
                }
              }} ref='file' style={{ display: 'none' }} />
            </el-form-item>
            <el-form-item>
              <span >
                <el-button onClick={() => { this.addDialogShow = false; }}>取 消</el-button>
                <el-button type='primary' onClick={() => {
                  (this.$refs.addDialogShow as Vue).validate((valid: boolean) => {
                    if (valid) {
                      coursesStore.create(this.addDialogForm, this.page);
                      this.addDialogForm = { avatar: '', description: '', title: '' };
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
