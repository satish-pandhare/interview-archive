"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { PlusCircle, X, Check } from "lucide-react";
import { ReactNode } from "react";

interface SelectorOption {
  id: string;
  name: string;
  imageUrl?: string | null;
}

interface SelectorDropdownProps {
  // Data and loading states
  options: SelectorOption[] | null | undefined;
  isLoading: boolean;
  error: Error | null;

  // Selection state
  selectedValues?: string | string[];
  isMultiSelect?: boolean;

  // Display
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage: string;
  getDisplayText: (
    selectedValues: string | string[] | undefined,
    options: SelectorOption[] | null | undefined,
  ) => string;

  // Actions
  onSelect: (id: string) => void;
  onClear?: () => void;
  onCreateNew?: () => void;

  // Customization
  renderOption?: (option: SelectorOption, isSelected: boolean) => ReactNode;
  disabled?: boolean;
  className?: string;
}

export const SelectorDropdown = ({
  options,
  isLoading,
  error,
  selectedValues,
  isMultiSelect = false,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  getDisplayText,
  onSelect,
  onClear,
  onCreateNew,
  renderOption,
  disabled = false,
  className,
}: SelectorDropdownProps) => {
  const displayText = getDisplayText(selectedValues, options);
  const hasSelection = isMultiSelect
    ? Array.isArray(selectedValues) && selectedValues.length > 0
    : selectedValues !== undefined && selectedValues !== null;

  const defaultRenderOption = (option: SelectorOption, isSelected: boolean) => (
    <>
      {option.imageUrl && (
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={option.imageUrl} alt="" className="size-4 rounded" />
          {option.name}
        </div>
      )}
      {!option.imageUrl && option.name}
      {isSelected &&
        (isMultiSelect ? (
          <X className="ml-auto h-4 w-4 text-muted-foreground" />
        ) : (
          <Check className="ml-auto h-4 w-4 text-primary" />
        ))}
    </>
  );

  const isOptionSelected = (optionId: string): boolean => {
    if (isMultiSelect) {
      return Array.isArray(selectedValues) && selectedValues.includes(optionId);
    }
    return selectedValues === optionId;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-between text-left",
            isMultiSelect && "justify-start",
            className,
          )}
          disabled={disabled || isLoading}
        >
          <span>
            {isLoading
              ? `Loading ${placeholder.toLowerCase()}...`
              : displayText}
          </span>
          {!isMultiSelect && hasSelection && onClear && (
            <X
              className="h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <div className="text-sm text-muted-foreground">
                  {`Loading ${placeholder.toLowerCase()}...`}
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-6">
                <div className="text-sm text-destructive">
                  {`Failed to load ${placeholder.toLowerCase()}`}
                </div>
              </div>
            ) : !options || options.length === 0 ? (
              <CommandEmpty className="flex justify-between items-center p-2 text-sm">
                {emptyMessage}
                {onCreateNew && (
                  <Button
                    className="size-5"
                    variant="ghost"
                    onClick={onCreateNew}
                  >
                    <PlusCircle className="size-4" />
                  </Button>
                )}
              </CommandEmpty>
            ) : (
              <>
                <CommandEmpty className="flex justify-between items-center p-2 text-sm">
                  {emptyMessage}
                  {onCreateNew && (
                    <Button
                      className="size-5"
                      variant="ghost"
                      onClick={onCreateNew}
                    >
                      <PlusCircle className="size-4" />
                    </Button>
                  )}
                </CommandEmpty>
                {options.map((option) => {
                  const isSelected = isOptionSelected(option.id);
                  return (
                    <CommandItem
                      key={option.id}
                      onSelect={() => onSelect(option.id)}
                      className={cn("cursor-pointer", isSelected && "bg-muted")}
                    >
                      {renderOption
                        ? renderOption(option, isSelected)
                        : defaultRenderOption(option, isSelected)}
                    </CommandItem>
                  );
                })}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
