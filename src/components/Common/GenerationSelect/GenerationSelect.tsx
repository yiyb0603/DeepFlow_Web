import { CSSProperties, memo } from 'react';
import { Select } from 'antd';
import { generations } from 'lib/models/authOption';

const { Option } = Select;

interface GenerationSelectProps {
  generationState: {
    generation: number;
    onChangeGeneration: (generation: number) => void;
  };
}

const GenerationSelect = ({
  generationState,
}: GenerationSelectProps): JSX.Element => {
  const selectStyle: CSSProperties = {
    width: '45%',
  };

  return (
    <Select
      style={selectStyle}
      value={generationState.generation}
      onChange={generationState.onChangeGeneration}
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
