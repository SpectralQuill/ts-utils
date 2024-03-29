import { ArrayUtils } from "./ArrayUtils";
import { NullishUtils } from "./NullishUtils";
import { OrderedArray } from "./OrderedArray";
import { Range } from "./Range";

export class DisjointRangeArray< T > extends OrderedArray< Range< T > > {

    public constructor() {

        super( Range.compareRange );

    }

    public addRange( range: Range< T > ): boolean {

        return this.addElement( range );

    }

    public addRanges( ...ranges: Range< T >[] ): Range< T >[] {

        return this.addElements( ...ranges );

    }

    public override indexToAddElement( range: Range<T> ): index {

        const undefinedInt: int = NullishUtils.makeUndefined< int >();
        if( !this.isCompatibleWithRange( range ) ) return undefinedInt;
        const
            indexToAddRight: index = super.indexToAddElement( range ),
            indexToAddLeft: index = ArrayUtils.leftIndex( this, indexToAddRight, false, false ),
            intersectsWithLeft: boolean = this[ indexToAddLeft ]?.intersectsWithRange( range ) ?? false,
            intersectsWithRight: boolean = this[ indexToAddRight ]?.intersectsWithRange( range ) ?? false
        ;
        return ( !intersectsWithLeft && !intersectsWithRight ) ? indexToAddRight : undefinedInt;
        
    }

    public isCompatibleWithRange( range: Range< T > ): boolean {

        return ArrayUtils.isEmpty( this ) ? true : this[ 0 ].compare == range.compare;

    }

}
