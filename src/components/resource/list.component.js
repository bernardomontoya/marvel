import React from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";
import ResourceListElement from './listElement.component';
import NoResultsFound from './noResultsFound.component';

export default function ResourceList({ data, configuration, loadMoreItems, resource }) {
    // Infinite Loader Configuration
    const item_margin = configuration.listElementMargin;
    const item_width = configuration.listElementWidth + item_margin;
    const item_height = configuration.listElementHeight;
    const row_margin = configuration.rowMargin;
    const textOnly = configuration.textOnly;
    const count = data.total;
    // Helper functions
    function getRowsAmount(width, itemsAmount) {
        const maxItemsPerRow = getMaxItemsAmountPerRow(width);
        return Math.ceil(itemsAmount/ maxItemsPerRow);
    }
    function getMaxItemsAmountPerRow(width) {
        return Math.max(Math.floor(width / (item_width + item_margin * 2)), 1);
    }
    function generateIndexesForRow(rowIndex, maxItemsPerRow, itemsAmount) {
        const result = [];
        const startIndex = rowIndex * maxItemsPerRow;
        for (let i = startIndex; i < Math.min(startIndex + maxItemsPerRow, itemsAmount); i++) {
            result.push(i);
        }
        return result;
    }
    const currentParent = document.getElementById("resources-list-container");
    const parentWidth = currentParent.getBoundingClientRect().width;
    const parentHeight = currentParent.getBoundingClientRect().height;
    const rowCount = getRowsAmount(parentWidth, data.data.length);
    const itemCount = true ? rowCount + 1 : rowCount;
    const Row = React.memo(function RowItem({id, element}) {
        return (
            <ResourceListElement data={element} configuration={configuration} resource={resource}/>
        );
    });
    const rowRenderer = ({index, style}) => {
        const maxItemsPerRow = getMaxItemsAmountPerRow(parentWidth);
        const elementsIds = generateIndexesForRow(index, maxItemsPerRow, data.data.length);
        const currentRowElements = elementsIds.map(elementIndex => data.data[elementIndex]);
            return (
                <div className="flex flex-row w-100 ph3 ph6-ns" style={style} >
                  {currentRowElements.map(elementId => {
                    return (
                      <Row key={elementId.id} id={elementId.id} element={elementId}/>
                    )
                  })}
                </div>
            )
        };
    function isItemLoaded(index) {
        const maxItemsPerRow = getMaxItemsAmountPerRow(parentWidth);
        const allItemsLoaded = generateIndexesForRow(index, maxItemsPerRow, data.data.length).length > 0;
        return allItemsLoaded;
    }
    return(
        <>
        {
            count > 0 ?
            <div className="flex flex-column items-center">
                <div className="w-100">
                    <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        itemCount={itemCount}
                        loadMoreItems={loadMoreItems}
                    >
                        {({ onItemsRendered, ref }) => (
                            <List
                                height={parentHeight - 105}
                                itemCount={rowCount}
                                itemSize={item_height + row_margin }
                                onItemsRendered={onItemsRendered}
                                ref={ref}
                                className="List"
                            >
                                {rowRenderer}
                            </List>
                        )}
                    </InfiniteLoader>
                </div>
            </div>
            : <NoResultsFound/>
        }
        </>
    )
}