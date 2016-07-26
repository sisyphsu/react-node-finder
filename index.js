/**
 * Created by sulin on 16/7/24.
 */
import React from 'react';

/**
 * search first parent in node-tree structure.
 * @param node  search from
 * @param pType parent type
 * @returns {Array || null}
 */
function findParent(node, pType) {
    let instance = node._reactInternalInstance;
    let owner = node._reactInternalInstance._currentElement._owner;
    let parentNode = instance._hostParent;
    // location real parent node based on owner
    while (parentNode._currentElement._owner._mountOrder != owner._mountOrder) {
        parentNode = parentNode._currentElement._owner;
        if (parentNode._currentElement._owner._mountOrder < owner._mountOrder) {
            parentNode = null;
            break;
        }
    }
    parentNode = parentNode || owner;
    parentNode = parentNode && parentNode._instance;
    // based on parentType
    if (pType && parentNode) {
        while (parentNode && !(parentNode instanceof pType)) {
            parentNode = findParent(parentNode, pType);
        }
    }
    return parentNode;
}

/**
 * search all parent in node-tree structure.
 * @param node  search from
 * @param pType parent type
 * @returns {Array || null}
 */
function findAllParent(node, pType) {
    let parents = [];
    let parent = findParent(node, pType);
    while (parent) {
        parents.push(parent);
        parent = findParent(parent, pType);
    }
    return parents.length ? parents : null;
}

/**
 * search all child-component in node-tree structure
 * @param node      search from
 * @param childType child type
 * @returns {Array || null}
 */
function findAllChildren(node, childType) {
    let children = _getAllChildren(node);
    let result = [];
    children.forEach(function (item) {
        let name = item.constructor.name;
        let instance = null;
        if (name == 'ReactCompositeComponentWrapper') {
            instance = item._instance;
            if (instance && instance.constructor.name == 'StatelessComponent') {
                instance = null;
            }
        } else if (['StatelessComponent', 'ReactDOMComponent'].indexOf(name) >= 0) {
            // ignore
        } else {
            console.warn('unknown children: ', item);
        }
        if (instance && (!childType || (instance instanceof childType))) {
            result.push(instance);
        }
    });
    return result;
}

// get all children Component by ricursion
function _getAllChildren(node) {
    if (node instanceof React.Component) {
        node = node._reactInternalInstance;
    }
    let children = [];
    if (node._renderedComponent) {
        children.push(node._renderedComponent);
        let deeper = _getAllChildren(node._renderedComponent);
        (deeper && deeper.length) && (children = children.concat(deeper));
    } else if (node._renderedChildren) {
        for (let key in node._renderedChildren) {
            if (node._renderedChildren.hasOwnProperty(key) && key.indexOf('.') == 0) {
                let child = node._renderedChildren[key];
                children.push(child);
                let deeper = _getAllChildren(child);
                (deeper && deeper.length) && (children = children.concat(deeper));
            }
        }
    }
    return children;
}