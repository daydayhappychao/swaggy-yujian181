import { Vue, Component } from 'vue-property-decorator';
import { observer } from 'mobx-vue';
import { toJS } from 'mobx';
import moment from 'moment';
import youngCardStore from '@/stores/youngCard';

@observer
@Component
export default class YoungCardNopass extends Vue {
  public beforeCreate() {
    youngCardStore.getNopass(this.$route.name === 'youngCardNopass' ? 0 : 1);
  }
  public render() {
    return (
      <div>
        <el-table
          data={toJS(youngCardStore.nopassList)}
          border
          onChange={() => { }}
          style='width: 100%'>
          <el-table-column
            fixed
            width='120px'
            label='logo'>
            {
              (scope: any) => (
                <img style={{ maxWidth: '100%' }} src={scope.row.avatar} />
              )
            }
          </el-table-column>
          <el-table-column
            prop='name'
            label='名称'>
          </el-table-column>
          <el-table-column
            prop='phone'
            label='联系方式'>
          </el-table-column>
          <el-table-column
            prop='scope'
            label='区域'>
          </el-table-column>
          <el-table-column
            prop='profession'
            label='职业'>
          </el-table-column>
          <el-table-column
            prop='cardId'
            label='卡号'>
          </el-table-column>
          <el-table-column
            label='申请时间'>
            {
              (scope: any) => (
                <div>
                  {
                    moment(scope.row.applyDate).format('YYYY-MM-DD HH:mm:ss')
                  }
                </div>
              )
            }
          </el-table-column>
          {
            this.$route.name === 'youngCardNopass' ?
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
                          youngCardStore.updateYoungCard(scope.row._id, 1);
                        }}
                      >通过</el-button>
                      <el-button
                        size='mini'
                        onClick={() => {
                          youngCardStore.updateYoungCard(scope.row._id, 2);
                        }}>不通过</el-button>
                    </div>
                }
              </el-table-column>
              :
              <el-table-column
                label='状态'
              >
                {
                  (scope: any) => (
                    <div>
                      {scope.row.status === 1 ? '已通过' : '未通过'}
                    </div>
                  )
                }
              </el-table-column>
          }
        </el-table >
      </div>
    );
  }
}
