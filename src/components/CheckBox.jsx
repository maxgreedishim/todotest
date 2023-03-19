import React, {useState} from 'react';

const CheckBox = ({clickCheckbox}) => {
    const [activeCheckBox, setActiveCheckBox] = useState(null);
    clickCheckbox(activeCheckBox)
    let nameCheckBox = ["Автору", "Рецепту", "Заголовоку"];
    return (
        <div>
            {nameCheckBox.map((name, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        defaultChecked
                        checked={index === activeCheckBox}
                        onClick={() => setActiveCheckBox(index)}
                    />
                    <strong className="textCheckBox">{name}</strong>
                </div>
            ))}
        </div>
    )
};

export default CheckBox;