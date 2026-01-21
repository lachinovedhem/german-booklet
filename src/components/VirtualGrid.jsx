import { useEffect, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

const VirtualGrid = ({ items, renderItem, itemHeight = 100, gap = 16 }) => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions({
                    width: rect.width,
                    height: Math.max(400, window.innerHeight - rect.top - 100)
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const columnCount = dimensions.width < 768 ? 1 : 2;
    const columnWidth = dimensions.width > 0
        ? (dimensions.width - (columnCount - 1) * gap) / columnCount
        : 0;
    const rowCount = Math.ceil(items.length / columnCount);

    const Row = ({ index, style }) => {
        const rowItems = [];
        for (let i = 0; i < columnCount; i++) {
            const itemIndex = index * columnCount + i;
            if (itemIndex < items.length) {
                rowItems.push(
                    <div
                        key={itemIndex}
                        style={{
                            width: columnWidth,
                            marginRight: i < columnCount - 1 ? gap : 0,
                        }}
                    >
                        {renderItem(items[itemIndex], itemIndex)}
                    </div>
                );
            }
        }

        return (
            <div
                style={{
                    ...style,
                    display: 'flex',
                    paddingBottom: gap,
                }}
            >
                {rowItems}
            </div>
        );
    };

    if (dimensions.width === 0 || dimensions.height === 0) {
        return <div ref={containerRef} style={{ width: '100%', minHeight: '400px' }} />;
    }

    return (
        <div ref={containerRef} style={{ width: '100%' }}>
            <List
                height={dimensions.height}
                itemCount={rowCount}
                itemSize={itemHeight + gap}
                width={dimensions.width}
                className="no-scrollbar"
            >
                {Row}
            </List>
        </div>
    );
};

export default VirtualGrid;
