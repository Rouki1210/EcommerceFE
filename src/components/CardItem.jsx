function CartItem({ item, onUpdateQty, onRemove, isRemoving }) {
    return (
        <div
            className="flex gap-4 p-4"
            style={{
                opacity: isRemoving ? 0 : 1,
                transform: isRemoving ? "translateX(24px)" : "none",
                transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
        >
            <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                    <div>
                        <p className="heading text-[14px] text-[#2c2c2c] leading-snug">{item.name}</p>
                        <p className="text-xs text-[#aaa]">{item.variant}</p>
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-[#ccc] text-lg hover:text-[#c0392b] transition-colors leading-none ml-2"
                    >
                        ×
                    </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                    {/* Qty stepper */}
                    <div className="flex items-center gap-2 border border-[#e8e8e8] rounded-full px-2 py-0.5">
                        <button
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-sm text-[#555] hover:bg-[#2c2c2c] hover:text-white transition-all"
                        >
                            −
                        </button>
                        <span className="text-xs w-4 text-center">{item.qty}</span>
                        <button
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-sm text-[#555] hover:bg-[#2c2c2c] hover:text-white transition-all"
                        >
                            +
                        </button>
                    </div>

                    <p className="heading text-[14px] text-[#2c2c2c]">
                        ${(item.price * item.qty).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CartItem;