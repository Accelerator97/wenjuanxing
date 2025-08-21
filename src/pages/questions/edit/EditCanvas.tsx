import React, { FC } from 'react';
import styles from './EditCanvas.module.scss';
import { Spin } from 'antd';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { getComponentConfByType } from '../../../components/QuestionComponents';
import { changeSelectedId, ComponentInfoType } from '../../../store/componentReducer';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

type PropsType = {
  loading: boolean;
};
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo; // 每个组件的信息，是从 redux store 获取的（服务端获取）
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;

  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) {
    event.stopPropagation(); // 阻止冒泡
    dispatch(changeSelectedId(id));
  }
  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    );
  return (
    <div className={styles.canvas}>
      {componentList.map(c => {
        const { fe_id } = c;
        const wrapperDefaultClassName = styles['component-wrapper'];
        const selectedClassName = styles.selected;
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });

        return (
          <div key={fe_id} className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditCanvas;
