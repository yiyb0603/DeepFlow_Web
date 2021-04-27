import { CSSProperties, memo, useMemo } from 'react';
import { Select } from 'antd';
import { generations } from 'lib/models/menu/authOption';

const { Option } = Select;

interface GenerationSelectProps {
  generation: number;
  onChangeGeneration: (generation: number) => void;
}

const GenerationSelect = ({
  generation,
  onChangeGeneration,
}: GenerationSelectProps): JSX.Element => {
  const selectStyle: CSSProperties = useMemo(() => {
    return {
      width: '45%',
    };
  }, []);

  return (
    <Select
      style={selectStyle}
      value={generation}
      onChange={onChangeGeneration}
    >
      {
        generations.map((_: unknown, idx: number) => (
          <Option
            key={idx}
            value={idx + 1}
          >
            {idx + 1}기
          </Option>
        ))
      }
    </Select>
  );
};

export default memo(GenerationSelect);
