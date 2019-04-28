import React from 'react';
import PropTypes from 'prop-types';
import { SearchOptionsContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import { Tree } from 'wisenet-ui/components/organisms';
import { Button } from 'wisenet-ui/components/atoms';

const UNCHECKED = 0;
// const CHECKED = 1;
// const PARTIALCHECKED = 2;

// Timeline에 그려질 색과 맞춤
// TimelineStyled.jsx 참고
const AlarmInput = 'yellow';
const TamperingDetection = 'skyblue';
const MotionDetection = 'red';
const VideoAnalysis = 'green';
// const FaceDetection = 'blue';
// const AudioDetection = 'purple';
// const NetworkDisconnect = 'orange';
// const UserInput = 'indigo';

//  ########### Tree Data Node Info ###########
//  {
//    id: 'all',               // 필수사항 // string
//    name: <span>All</span>,  // 필수사항 // object
//
//    children: [],            // 선택사항 // array
//    parents: [],             // 선택사항 // array
//                                        // 본인이 children 중에 하나 일때 필수, 부모 노드 id를 배열로 입력
//                                        // [0]에는 부모, [1]에는 조부모, [2]에는 증조부모 순으로 작성
//    checked: UNCHECKED,      // 선택사항 // checekbox 사용할 때 값
//    expanded: false,         // 선택사항 // children이 있고 처음 render 할 때, 펼쳐 놓을지에 대한 속성
//                                        // true는 펼쳐짐. false일 때는 작성 필요 없음
//  },
//
const treeData = [
  {
    id: 'all',
    name: 'All',
    checked: UNCHECKED,
    expanded: true,
    children: [
      {
        id: 'AlarmInput',
        name: 'Alarm Input',
        checked: UNCHECKED,
        parents: ['all'],
        // icon: <IconCircle color={AlarmInput} />,
        icon: {
          type: 'circle',
          color: AlarmInput,
        },
      },
      {
        id: 'TamperingDetection',
        // name: <span>Tampering Detection</span>,
        name: 'Tampering Detection',
        checked: UNCHECKED,
        parents: ['all'],
        // icon: <IconCircle color={TamperingDetection} />,
        icon: {
          type: 'circle',
          color: TamperingDetection,
        },
      },
      {
        id: 'VideoAnalysis',
        name: 'Video Analysis',
        checked: UNCHECKED,
        parents: ['all'],
        // icon: <IconCircle color={VideoAnalysis} />,
        icon: {
          type: 'circle',
          color: VideoAnalysis,
        },
        expanded: true,
        children: [
          {
            id: 'Passing',
            name: 'Passing',
            checked: UNCHECKED,
            parents: ['VideoAnalysis'],
          },
          {
            id: 'Entering',
            name: 'Entering',
            checked: UNCHECKED,
            parents: ['VideoAnalysis'],
          },
          {
            id: 'Appearing',
            name: 'Appearing',
            checked: UNCHECKED,
            parents: ['VideoAnalysis'],
          },
        ],
      },
      {
        id: 'MotionDetection',
        name: 'Motion Detection',
        checked: UNCHECKED,
        parents: ['all'],
        // icon: <IconCircle color={MotionDetection} />,
        icon: {
          type: 'circle',
          color: MotionDetection,
        },
      },
    ],
  },
];

class SearchOptions extends React.PureComponent {
  render() {
    const {
      treeClick,
      applyEventFilter,
      // lang,
      setApply,
      willExportTree,
    } = this.props;
    return (
      <div style={{ width: 370, height: 400 }}>
        {/* <div style={{ height: 340 }}>            // 부모 div, height 값 필수
          <Tree
            treeData={treeData}                      // 필수사항
            treeNodeClick={treeClick}                // 선택사항 // 외부에서 트리의 특정 노드의 선택이 필요 할 때
            showCheckbox                             // 선택사항
            showIcon                                 // 선택사항
            canDrag={false}                          // 선택사항 // false 일때만. true 때는 작성 필요 없음
            exportTreeData={willExportTree}          // 선택사항 // checked 등 tree의 데이터가 필요 할 때 필요한 변수
            exportTreeDataFunc={applyEventFilter}    // 선택사항 // checked 등 tree의 데이터가 필요 할 때 필요한 함수
            setApply={setApply}                      // 선택사항 // checked 등 tree의 데이터가 필요 할 때 필요한 함수
          />
        </div> */}
        <div style={{ height: 340 }}>
          <Tree
            treeData={treeData}
            treeNodeClick={treeClick}
            showCheckbox
            showIcon
            canDrag={false}
            exportTreeData={willExportTree}
            exportTreeDataFunc={applyEventFilter}
            setApply={setApply}
          />
        </div>
        <div
          style={{ textAlign: 'center' }}
        >
          <Button
            onClick={() => setApply(true)}
            style={{ display: 'inline-block', margin: '10px' }}
          >
            {'적용'}
          </Button>
          <Button
            onClick={() => console.log('취소')}
            style={{ display: 'inline-block', margin: '10px' }}
          >
            {'취소'}
          </Button>
        </div>
      </div>
    );
  }
}

SearchOptions.defaultProps = {
  treeClick: () => {},
  setApply: () => {},
};

SearchOptions.propTypes = {
  treeClick: PropTypes.func,
  setApply: PropTypes.func,
  willExportTree: PropTypes.bool.isRequired,
  applyEventFilter: PropTypes.func.isRequired,
  // lang: PropTypes.instanceOf(Object).isRequired,
};

export default withContainer(SearchOptionsContainer, SearchOptions);
