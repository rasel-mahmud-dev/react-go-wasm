import {FC, Fragment, PropsWithChildren, useEffect, useState} from 'react';
import './wasm_exec.js';
import './wasmTypes.d.ts';


async function loadWasm(): Promise<void> {
    const goWasm = new window.Go();
    const result = await WebAssembly.instantiateStreaming(fetch('main.wasm'), goWasm.importObject);
    goWasm.run(result.instance);
}

export const LoadWasm: FC<PropsWithChildren<{}>> = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadWasm().then(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div>
                loading WebAssembly...
        </div>
    );
    } else {
        return <Fragment>{props.children}</Fragment>;
    }
};

